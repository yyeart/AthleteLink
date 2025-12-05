from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserFullStatsSerializer

from .serializers import UserSerializer
from .permissions import IsProfileOwner

from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework import status

from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class CurrentUserUpdateView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class DebugView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request, *args, **kwargs):
        return Response({"status": "SUCCESS - AllowAny works here"})

class CurrentUserView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserProfileStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserFullStatsSerializer(user, context={'request': request})
        
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsProfileOwner])
def profile_detail(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)



User = get_user_model()

@login_required
def profile_view(request, username):
    user = get_object_or_404(User, username=username)
    return render(request, 'user_profile/profile.html', {'profile_user': user})

def stats_view(request, username):
    return render(request, 'user_profile/stats.html')

@login_required
def inactive_view(request, username):
    return render(request, 'user_profile/inactive.html')

@login_required
def games_view(request, username):
    return render(request, 'user_profile/games.html')

@login_required
def settings_view(request, username):
    return render(request, 'user_profile/settings.html')

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")
    secret_answer = request.data.get("secret_answer")

    if not current_password or not new_password:
        return Response({"error": "Укажите текущий и новый пароль."}, status=400)

    if not user.check_password(current_password):
        return Response({"error": "Текущий пароль неверен."}, status=400)

    if user.secret_question:
        if not secret_answer:
            return Response({"error": "Введите ответ на секретный вопрос."}, status=400)

        if not user.check_secret_answer(secret_answer):
            return Response({"error": "Ответ на секретный вопрос неверен."}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"detail": "Пароль успешно изменён."}, status=200)

@api_view(["POST"])
@permission_classes([AllowAny])
def reset_password_by_secret(request):
    email = request.data.get("email")
    answer = request.data.get("secret_answer")
    new_password = request.data.get("new_password")

    if not (email and answer and new_password):
        return Response({"error": "Все поля обязательны."}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Пользователь не найден."}, status=404)

    if not user.check_secret_answer(answer):
        return Response({"error": "Неверный ответ на секретный вопрос."}, status=400)

    user.set_password(new_password)
    user.save()

    return Response({"detail": "Пароль успешно изменён."})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_secret_question(request):
    user = request.user
    data = request.data or {}

    new_question = data.get("new_secret_question", "").strip()
    new_answer = data.get("new_secret_answer", "").strip()
    current_answer = data.get("current_secret_answer", "").strip()

    if not new_question:
        return Response({"error": "Нужно выбрать новый секретный вопрос."}, status=status.HTTP_400_BAD_REQUEST)
    if not new_answer:
        return Response({"error": "Нужно ввести новый ответ на секретный вопрос."}, status=status.HTTP_400_BAD_REQUEST)

    if user.secret_question:
        if not current_answer:
            return Response({"error": "Нужно ввести текущий ответ на секретный вопрос."}, status=status.HTTP_400_BAD_REQUEST)
        if not user.check_secret_answer(current_answer):
            return Response({"error": "Текущий ответ на секретный вопрос неверен."}, status=status.HTTP_400_BAD_REQUEST)

    user.secret_question = new_question
    user.set_secret_answer(new_answer)
    user.save()

    return Response({"detail": "Секретный вопрос успешно сохранён."}, status=status.HTTP_200_OK)