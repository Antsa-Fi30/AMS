from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.name", read_only=True)
    patient_phone = serializers.CharField(source="patient.phone_number", read_only=True)
    doctor_name = serializers.CharField(source="doctor.name", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "reason",
            "notes",
            "patient",
            "patient_name",
            "patient_phone",
            "doctor",
            "doctor_name",
            "finished",
            "status",
            "descriptions",
            "date",
            "time",
            "expire",
            "requested_at",
            "updated_at",
        ]
