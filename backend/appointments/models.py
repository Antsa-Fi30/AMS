from django.db import models
from django.conf import settings


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("rejected", "Rejected"),
        ("canceled", "Canceled"),
    ]
    descriptions = models.CharField(max_length=150, null=True, blank=True)
    reason = models.CharField(max_length=150, null=True, blank=True)
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # It's a place for a model, but here ...an exception
        on_delete=models.CASCADE,
        related_name="appointments_as_patient",
    )

    # Doctor field (optional ,especially for multi-doctor feature)
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # It's a place for a model, but here ...an exception
        on_delete=models.CASCADE,
        related_name="appointments_as_doctor",
        null=True,
        blank=True,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )
    notes = models.TextField(blank=True, null=True)

    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    expire = models.DateField(null=True, blank=True)

    requested_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.patient} → {self.doctor} ({self.status})"
