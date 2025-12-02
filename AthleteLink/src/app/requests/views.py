from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .models import ActivityRequest, Sport
from .serializers import (RequestListSerializer, RequestCreateSerializer, SportSerializer,
                          AllRequestsListSerializer, RequestDetailSerializer)
from ..user.models import UserSportStats

class RequestListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ActivityRequest.objects.filter(request_creator=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RequestCreateSerializer
        return RequestListSerializer
    
    def perform_create(self, serializer):
        instance = serializer.save(request_creator=self.request.user)
        instance.participants.add(self.request.user)

class RequestCreateView(generics.CreateAPIView):
    serializer_class = RequestCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ActivityRequest.objects.all()

    def perform_create(self, serializer):
        serializer.save(request_creator=self.request.user)

class SportListView(generics.ListAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer
    permission_classes = [permissions.AllowAny]

class AllRequestsListView(generics.ListAPIView):
    serializer_class = AllRequestsListSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return ActivityRequest.objects.filter(
            status='planned'
        ).select_related('sport').order_by('event_date')

class RequestDetailView(generics.RetrieveAPIView):
    queryset = ActivityRequest.objects.all()
    serializer_class = RequestDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

class CancelRequestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.request_creator != request.user:
            return Response({'error': 'Только организатор может отменить игру'}, status=403)
        
        activity.delete()
        return Response({'message': 'Заявка удалена'}, status=200)

class JoinRequestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.status != 'planned':
            return Response({"error": "Игра уже началась или завершена"}, status=400)
        
        if activity.participants.count() >= activity.players_count:
            return Response({"error": "Лобби переполнено"}, status=400)
        
        if activity.participants.filter(id=request.user.id).exists():
            return Response({"error": "Вы уже участвуете в игре"}, status=400)
        
        activity.participants.add(request.user)
        return Response({"message": "Вы вступили в игру"})
    
class LeaveRequestView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.status != 'planned':
            return Response({"error": "Нельзя покинуть активную или завершенную игру"}, status=400)
        
        if activity.request_creator == request.user:
            return Response({"error": "Организатор должен сначала отменить или завершить игру"}, status=400)
        
        activity.participants.remove(request.user)
        return Response({"message": "Вы покинули игру"})
    
class KickParticipantView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.request_creator != request.user:
            return Response({"error": "Только организатор может исключать игроков"}, status=403)
            
        user_id_to_kick = request.data.get('user_id')
        if not user_id_to_kick:
            return Response({"error": "Не указан ID пользователя"}, status=400)
            
        user_to_kick = get_object_or_404(activity.participants, id=user_id_to_kick)
        activity.participants.remove(user_to_kick)
        
        return Response({"message": f"Пользователь {user_to_kick.username} исключен"})
    
class StartGameView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.request_creator != request.user:
            return Response({"error": "Только организатор может начать игру"}, status=403)
        
        if activity.status != 'planned':
            return Response({"error": "Игра уже начата или завершена"}, status=400)
        
        activity.status = 'active'
        activity.save()
        return Response({"message": "Игра начата!", "status": "active"})
    
class FinishGameView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        activity = get_object_or_404(ActivityRequest, pk=pk)

        if activity.request_creator != request.user:
            return Response({"error": "Только организатор может завершить игру"}, status=403)

        if activity.status != 'active':
            return Response({"error": "Нельзя завершить неактивную игру"}, status=400)
        
        winners_ids = request.data.get('winners_ids', [])
        if not winners_ids:
            return Response({"error": "Победители не выбраны"}, status=400)

        with transaction.atomic():
            activity.status = 'completed'

            participants = activity.participants.all()
            sport = activity.sport

            for participant in participants:
                stats, t = UserSportStats.objects.get_or_create(user=participant, sport=sport)

                if participant.id in winners_ids:
                    activity.winners.add(participant)

                    participant.total_wins += 1
                    participant.global_rating += 25

                    stats.wins += 1
                    stats.rating += 25
                else:
                    participant.total_losses += 1
                    participant.global_rating = max(0, participant.global_rating - 25)

                    stats.losses += 1
                    stats.rating = max(0, stats.rating - 25)
                
                participant.save()
                stats.save()

            activity.save()
        return Response({"message": "Игра завершена, статистика обновлена", 'status': 'completed'})


