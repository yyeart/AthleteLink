from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def index_page(request: HttpRequest) -> HttpResponse:
    context = {
        'page_name': 'AthleteLink',
        'url': '/'
    }
    return render(request, 'pages/index.html', context)

