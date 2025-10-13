from django.shortcuts import render
from django.http import HttpRequest, HttpResponse

def default_menu() -> tuple:
    """
    Кортеж с текстом и url для каждой ссылки в менюшке
    """
    menu = (
        {'url': '/', 'text': 'Главная'},
        {'url': '/user/register', 'text': 'Зарегистрироваться'},
        {'url': '/user/login', 'text': 'Войти в аккаунт'}
    )
    return menu

def index_page(request: HttpRequest) -> HttpResponse:
    context = {
        'page_name': 'AthleteLink',
        'menu': default_menu()
    }
    return render(request, 'pages/index.html', context)

