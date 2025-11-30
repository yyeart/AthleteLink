from django.urls import path
from . import views

app_name = 'requests'

urlpatterns = [
    path("", views.RequestListCreateView.as_view(), name='list'),
    path("create/", views.RequestCreateView.as_view(), name='create'),
    path('sports/', views.SportListView.as_view(), name='sport-list')
]