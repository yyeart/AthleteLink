from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.pages.urls')),
    path('user/', include('app.user.urls')),
]