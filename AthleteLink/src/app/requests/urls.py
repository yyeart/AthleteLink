from django.urls import path
from . import views

app_name = 'requests'

urlpatterns = [
    path("", views.RequestListAPIView.as_view(), name='list'),
    # path("/create/", views.create_request_page, name='create') ПОКА НЕ ВОРКАЕТ
]