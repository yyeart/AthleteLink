import json
import random
from django.contrib.auth import login, authenticate, logout
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .forms import UserRegistrationForm, UserLoginForm
from rest_framework.views import APIView
from rest_framework.response import Response


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {'detail': 'Успешный выход из системы'},
            status=200
        )


def get_data(request):
    try:
        return json.loads(request.body)
    except (json.JSONDecodeError, TypeError):
        return request.POST.dict()

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = get_data(request)
        # entered_code = data.get('verification_code')
        # real_code = request.session.get('verification_code')
        # if entered_code != real_code:
        #     messages.error(request, 'Неверный код подтверждения')
        #     return render(request, 'user/register.html', {'form': form, 'page_name': 'Регистрация в AthleteLink'})
        # ПОКА БЕЗ ЭТОГО ЛАДНО?)?)?))?
        form = UserRegistrationForm(data)
   
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            login(request, user)
            return JsonResponse({'message': 'Вы успешно зарегистрировались!', 'username': user.username})
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    return JsonResponse({'error': 'Используйте POST запрос!'}, status=405)

@csrf_exempt
def send_verification_code(request):
    if request.method == 'POST':
        data = get_data(request)
        email = data.get('email')
        if not email:
            return JsonResponse({'error': 'Введите email'}, status=400)
        
        code = random.randint(100000, 999999)
        request.session['verification_code'] = str(code)
        request.session.modified = True
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

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        data = get_data(request)
        form = UserLoginForm(data)
        if form.is_valid():
            username_or_email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username_or_email, password=password)

            if user:
                login(request, user)
                return JsonResponse({
                    'message': f'Добро пожаловать, {user.full_name}!',
                    'username': user.username
                })
            else:
                return JsonResponse({'errors': {'non_field_errors': ['Неверный логин или пароль']}}, status=400)
        else:
            return JsonResponse({'errors': form.errors}, status=400)

    return JsonResponse({'error': 'Используйте POST запрос'}, status=405)

@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Вы успешно вышли из аккаунта'})