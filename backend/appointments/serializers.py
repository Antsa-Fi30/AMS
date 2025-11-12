from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.name", read_only=True)
    patient_phone = serializers.CharField(source="patient.phone_number", read_only=True)
    doctor_name = serializers.CharField(source="doctor.name", read_only=True)
    doctor_phone = serializers.CharField(source="doctor.phone_number", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "code",
            "type",
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
            "requested_at",
            "updated_at",
        ]
