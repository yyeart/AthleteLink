from django.urls import path
from . import views

app_name = 'requests'

urlpatterns = [
    path("", views.requests_page, name='requests'),
    path("/create/", views.create_request_page, name='create')
]