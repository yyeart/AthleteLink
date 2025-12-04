from django.urls import path
from . import views

app_name = 'profile'

urlpatterns = [
    path('me/', views.CurrentUserView.as_view(), name='current_user'),
    path('me/update/', views.CurrentUserUpdateView.as_view(), name='update_user'),
    path('<str:username>/', views.profile_detail, name='detail'),
    path('<str:username>/stats/', views.stats_view, name='stats'),
    path('<str:username>/inactive/', views.inactive_view, name='inactive'),
    path('<str:username>/requests/', views.games_view, name='games'),
    path('<str:username>/settings/', views.settings_view, name='settings'),
    path('my-stats/', views.UserProfileStatsView.as_view(), name='my-stats'),
    path('debug/', views.DebugView.as_view(), name='debug')
]