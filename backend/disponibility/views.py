from rest_framework import viewsets, permissions, status
from .models import Disponibility
from .serializers import DisponibilitySerializer
from rest_framework.decorators import action
from rest_framework.response import Response


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

    @action(detail=False, methods=["get"], url_path="doctor_dispo")
    def fetch_disponibility(self, request):
        doctor_id = request.query_params.get("id", request.user.id)
        disponibilities = Disponibility.objects.filter(doctor_id=doctor_id)
        serializer = self.get_serializer(disponibilities, many=True)
        return Response(serializer.data)
