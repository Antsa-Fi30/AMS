from rest_framework import viewsets, permissions, status
from .models import Disponibility
from .serializers import DisponibilitySerializer
from rest_framework.decorators import action
from rest_framework.response import Response


# Create your views here.
class DisponibilityViewSet(viewsets.ModelViewSet):
    queryset = Disponibility.objects.all()
    serializer_class = DisponibilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Disponibility.objects.filter(doctor_id=user.id)

    @action(detail=False, methods=["delete"], url_path="delete_all")
    def delete_all(self, request):
        disponibilities = Disponibility.objects.filter(doctor=request.user)
        count, _ = disponibilities.delete()
        return Response({"detail": f"{count} créneaux supprimés ✅"})
