from rest_framework import generics, permissions, status
from .models import ActivityRequest, Sport
from .serializers import RequestListSerializer, RequestCreateSerializer, SportSerializer

class RequestListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ActivityRequest.objects.filter(request_creator=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RequestCreateSerializer
        return RequestListSerializer
    
    def perform_create(self, serializer):
        serializer.save(request_creator=self.request.user)

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