from django.urls import path
from . import views

app_name = 'user'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('send-code/', views.send_verification_code, name='send_code'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
]