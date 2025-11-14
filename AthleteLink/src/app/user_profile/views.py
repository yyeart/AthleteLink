from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required

User = get_user_model()

@login_required
def profile_view(request, username):
    user = get_object_or_404(User, username=username)
    return render(request, 'user_profile/profile.html', {'profile_user': user})

@login_required
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