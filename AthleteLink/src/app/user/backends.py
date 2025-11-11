from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailOrUsernameBackend(BaseBackend):
    """
    Аутентификация по email или username.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None or password is None:
            return None
        try:
            # сначала ищем по email
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            try:
                # потом по username
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return None

        if user.check_password(password) and user.is_active:
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
