from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('app.pages.urls', 'pages'), namespace='pages')),
    path('user/', include(('app.user.urls', 'user'), namespace='user')),
    path('profile/', include(('app.user_profile.urls', 'profile'), namespace='profile')),
    path('requests/', include(('app.requests.urls', 'requests'), namespace='requests'))
]