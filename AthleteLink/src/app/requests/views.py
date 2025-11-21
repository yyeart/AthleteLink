from django.shortcuts import render

def requests_page(request):
    return render(request, 'requests/requests_page.html')

def create_request_page(request):
    ...