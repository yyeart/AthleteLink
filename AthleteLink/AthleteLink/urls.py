from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(('pages.urls', 'pages'), namespace='pages')),
    path('user/', include(('user.urls', 'user'), namespace='user')),
    path('profile/', include(('user_profile.urls', 'profile'), namespace='profile'))
]
