from rest_framework import permissions

class IsProfileOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        url_username = view.kwargs.get('username')
        if url_username and request.user.username == url_username:
            return True
        return False