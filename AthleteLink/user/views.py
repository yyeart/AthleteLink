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
            return render(request, 'user/register.html', {'form': form})
        
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data.get('password1'))
            user.save()
            login(request, user)
            messages.success(request, 'Вы успешно зарегистрировались!')
            print(form.data.get('email'), form.data.get('password'))
            return redirect('pages:home')
    else:
        form = UserRegistrationForm()

    return render(request, 'user/register.html', {'form': form})

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
        email = form.data.get('email')
        password = form.data.get('password')
        
        try:
            user = User.objects.get(email=email)
            authenticate(request, email=email, password=password)
        except User.DoesNotExist:
            try:
                user = User.objects.get(username=email)
                authenticate(request, username=email, password=password)
            except User.DoesNotExist:
                messages.error(request, 'Пользователь не найден')
                return render(request, 'user/login.html', {'form': form})
        if user is None:
            messages.error(request, 'Неверный пароль')
            return render(request, 'user/login.html', {'form': form})
        else:
            login(request, user)
            messages.success(request, f'Добро пожаловать, {user.first_name}!')
            return redirect('pages:home')
    else:
        form = UserLoginForm()

    return render(request, 'user/login.html', {'form': form})

def user_logout(request):
    logout(request)
    messages.success(request, 'Вы успешно вышли из аккаунта')
    return redirect('pages:home')

def profile(request):
    """
    ЗАГЛУШКА
    """
    return redirect(request, 'pages:home')