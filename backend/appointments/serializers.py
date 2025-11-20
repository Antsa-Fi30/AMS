from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.name", read_only=True)
    patient_phone = serializers.CharField(source="patient.phone_number", read_only=True)
    doctor_name = serializers.CharField(source="doctor.name", read_only=True)
    doctor_phone = serializers.CharField(source="doctor.phone_number", read_only=True)

    # ➕ nouveaux champs
    start_time = serializers.SerializerMethodField()
    end_time = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            "id",
            "code",
            "type",
            "notes",
            "patient",
            "patient_name",
            "patient_phone",
            "doctor",
            "doctor_name",
            "doctor_phone",
            "finished",
            "status",
            "descriptions",
            "date",
            "time",
            "disponibility",
            "start_time",  # <---
            "end_time",  # <---
            "requested_at",
            "updated_at",
        ]

    # Méthodes pour récupérer les données du modèle Disponibility
    def get_start_time(self, obj):
        if obj.disponibility:
            return obj.disponibility.start_time
        return None

    def get_end_time(self, obj):
        if obj.disponibility:
            return obj.disponibility.end_time
        return None
