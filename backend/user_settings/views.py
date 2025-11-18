from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import UserSetting
from .serializers import UserSettingSerializer


class UserSettingViewSet(viewsets.ModelViewSet):
    serializer_class = UserSettingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSetting.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def list(self, request, *args, **kwargs):
        # Renvoie toujours les settings de l'utilisateur courant
        instance, _ = UserSetting.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
