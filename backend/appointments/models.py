from django.db import models
from django.conf import settings


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("rejected", "Rejected"),
        ("canceled", "Canceled"),
    ]
    descriptions = models.JSONField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    reason = models.CharField(max_length=150, null=True, blank=True)
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # It's a place for a model, but here ...an exception
        on_delete=models.CASCADE,
        related_name="appointments_as_patient",
    )

    #### Doctor field (optional ,especially for multi-doctor feature but not for now)
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

    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    expire = models.DateField(null=True, blank=True)
    finished = models.BooleanField(default=False)

    requested_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.reason:
            last_appointment = Appointment.objects.order_by("-id").first()
            if last_appointment:
                last_id = last_appointment.id + 1
            else:
                last_id = 1

            self.reason = f"APT-{last_id:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.patient} → {self.doctor} ({self.status})"
