from rest_framework import serializers
from .models import Disponibility


class DisponibilitySerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="doctor.name", read_only=True)
    doctor_phone = serializers.CharField(source="doctor.phone_number", read_only=True)

    class Meta:
        model = Disponibility
        fields = [
            "id",
            "start_time",
            "end_time",
            "doctor",
            "doctor_name",
            "doctor_phone",
        ]
