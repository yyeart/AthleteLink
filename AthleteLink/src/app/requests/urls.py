from django.urls import path
from . import views

app_name = 'requests'

urlpatterns = [
    path("", views.RequestListCreateView.as_view(), name='list_create'),
    # path("/create/", views.create_request_page, name='create') ПОКА НЕ ВОРКАЕТ
]