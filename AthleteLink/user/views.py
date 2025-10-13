from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
import random

from .forms import UserRegistrationForm

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
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, f'Добро пожаловать, {user.first_name}')
            return redirect('pages:home')
        else:
            messages.error(request, 'Неверный email или пароль')

    return render(request, 'user/login.html')

def user_logout(request):
    logout(request)
    messages.success(request, 'Вы успешно вышли из аккаунта')
    return redirect('pages:home')

def profile(request):
    """
    ЗАГЛУШКА
    """
    return redirect(request, 'pages:home')