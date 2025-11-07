from django.urls import path
from . import views

app_name = 'profile'

urlpatterns = [
    path('<str:username>/', views.profile_view, name='detail'),
    path('<str:username>/statistics/', views.stats_view, name='stats'),
    path('<str:username>/inactive/', views.inactive_view, name='inactive'),
    path('<str:username>/games/', views.games_view, name='games'),
    path('<str:username>/settings/', views.settings_view, name='settings'),
]