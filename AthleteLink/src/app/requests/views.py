from rest_framework import generics, permissions
from .models import ActivityRequest
from .serializers import RequestListSerializer

class RequestListAPIView(generics.ListAPIView):
    serializer_class = RequestListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ActivityRequest.objects.filter(user=self.request.user)