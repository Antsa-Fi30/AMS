from django.db import models
from django.conf import settings
from django.forms import ValidationError
from disponibility.models import Disponibility


class Appointment(models.Model):
    TYPES_CHOICES = [
        ("first", "First appointment"),
        ("follow_up", "Follow up control healthcare"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("rejected", "Rejected"),
        ("canceled", "Canceled"),
    ]

    code = models.CharField(max_length=150, null=True, blank=True)
    type = models.CharField(max_length=20, choices=TYPES_CHOICES, default="first")
    descriptions = models.JSONField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
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

    disponibility = models.ForeignKey(
        Disponibility,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="appointments",
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)

    finished = models.BooleanField(default=False)
    requested_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.type == "first":
            if not self.disponibility:
                raise ValidationError(
                    "Un premier rendez-vous doit être lié à un créneau disponible."
                )
            if self.date or self.start_time or self.end_time:
                raise ValidationError(
                    "Les champs date/heure ne doivent pas être définis pour un premier rendez-vous."
                )
        if self.type == "follow_up":
            if not (self.date and self.start_time and self.end_time):
                raise ValidationError(
                    "Le suivi doit contenir une date et une heure définies par le docteur."
                )
            if self.disponibility:
                raise ValidationError(
                    "Un suivi ne doit pas être lié à un créneau de disponibilité."
                )

        super().clean()

    def save(self, *args, **kwargs):
        if not self.code:
            last_appointment = Appointment.objects.order_by("-id").first()
            if last_appointment:
                last_id = last_appointment.id + 1
            else:
                last_id = 1

            self.code = f"APT-{last_id:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.patient} → {self.doctor} ({self.status})"
