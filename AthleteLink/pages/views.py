from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def index_page(request: HttpRequest) -> HttpResponse:
    urls = (
        {'text': 'Регистрация', 'url': '/register'},
        {'text': 'Авторизация', 'url': '/login'},
        {'text': 'Смешная кнопка', 'url': '/lol'}
    )
    context = {
        'page_name': 'AthleteLink',
        'urls': urls
    }
    return render(request, 'pages/index.html', context)

