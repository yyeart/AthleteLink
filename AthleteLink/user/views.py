from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
import random

from .forms import UserRegistrationForm, UserLoginForm
from .models import User

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        entered_code = request.POST.get('verification_code')
        real_code = request.session.get('verification_code')

        if entered_code != real_code:
            messages.error(request, 'Неверный код подтверждения')
            return render(request, 'user/register.html', {'form': form, 'page_name': 'Регистрация в AthleteLink'})
        
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data.get('password'))
            user.save()
            login(request, user)
            messages.success(request, 'Вы успешно зарегистрировались!')
            return redirect('pages:home')
    else:
        form = UserRegistrationForm()

    return render(request, 'user/register.html', {'form': form, 'page_name': 'Регистрация в AthleteLink'})

def send_verification_code(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if not email:
            return JsonResponse({'error': 'Введите email'}, status=400)
        
        code = random.randint(100000, 999999)
        request.session['verification_code'] = str(code)

        try:
            send_mail(
                'AthleteLink - код подтверждения',
                f'Ваш код: {code}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False
            ) 
        except Exception as e:
            return JsonResponse({'error': f'Ошибка отправления письма: {e}'}, status=500)
        
        return JsonResponse({'message': 'Код подтверждения был отправлен на почту'})
    
    return JsonResponse({'error': 'Ожидание запроса'}, status=405)

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username_or_email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username_or_email, password=password)

            if user:
                login(request, user)
                messages.success(request, f'Добро пожаловать, {user.first_name}!')
                return redirect('pages:home')
            else:
                messages.error(request, 'Неверный логин или пароль')
                return render(request, 'user/login.html', {'form': form, 'page_name': 'Войти в аккаунт'})
    else:
        form = UserLoginForm()

    return render(request, 'user/login.html', {'form': form, 'page_name': 'Войти в аккаунт'})

def user_logout(request):
    logout(request)
    messages.success(request, 'Вы успешно вышли из аккаунта')
    return redirect('pages:home')

def profile(request):
    context = {}
    context['page_name'] = 'Профиль'
    return render(request, 'user/profile.html', context)