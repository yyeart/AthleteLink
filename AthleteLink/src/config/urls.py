from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from app.requests.views import AllRequestsListView

def api_healthcheck(request):
    return JsonResponse({"message": "Django is connected!", "status": "ok"})

def test_view(request):
    return JsonResponse({"message": "TEST OK", "status": "200"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/login/', test_view),
    path('api/health/', api_healthcheck),
    path('', include(('app.pages.urls', 'pages'), namespace='pages')),
    # path('user/', include(('app.user.urls', 'user'), namespace='user')),
    path('user/', include('app.user.urls')),
    path('profile/', include(('app.user_profile.urls', 'profile'), namespace='profile')),
    path('requests/', include(('app.requests.urls', 'requests'), namespace='requests')),
    path('all-requests/', AllRequestsListView.as_view(), name='all-requests')
]