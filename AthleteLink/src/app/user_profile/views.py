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


