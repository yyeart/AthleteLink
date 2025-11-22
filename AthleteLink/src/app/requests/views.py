from rest_framework import generics, permissions
from .models import ActivityRequest
from .serializers import RequestListSerializer, RequestCreateSerializer

class RequestListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ActivityRequest.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return RequestCreateSerializer
        return RequestListSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)