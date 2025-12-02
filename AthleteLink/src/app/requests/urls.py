from django.urls import path
from . import views

app_name = 'requests'

urlpatterns = [
    path("", views.RequestListCreateView.as_view(), name='list'),
    path("create/", views.RequestCreateView.as_view(), name='create'),
    path('sports/', views.SportListView.as_view(), name='sport-list'),

    path('<int:pk>/', views.RequestDetailView.as_view(), name='detail'),

    path('<int:pk>/join/', views.JoinRequestView.as_view(), name='join'),
    path('<int:pk>/leave/', views.LeaveRequestView.as_view(), name='leave'),
    path('<int:pk>/kick/', views.KickParticipantView.as_view(), name='kick'),
    path('<int:pk>/start/', views.StartGameView.as_view(), name='start'),
    path('<int:pk>/finish/', views.FinishGameView.as_view(), name='finish'),
    path('<int:pk>/cancel/', views.CancelRequestView.as_view(), name='cancel'),
]