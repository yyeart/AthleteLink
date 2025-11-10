from django.shortcuts import render
from django.http import HttpResponse

def register(request):
    return HttpResponse("Страница регистрации (в разработке)")

def user_login(request):
    return HttpResponse("Страница входа (в разработке)")