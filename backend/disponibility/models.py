from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models import Q


# Create your models here.
class Disponibility(models.Model):
    start_time = models.TimeField(blank=False, null=False)
    end_time = models.TimeField(blank=False, null=False)
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_disponibility",
    )

    def clean(self):
        if self.end_time <= self.start_time:
            raise ValidationError("L'heure de fin doit être après l'heure de début.")

        overlapping = Disponibility.objects.filter(
            doctor=self.doctor,
        ).filter(Q(start_time__lt=self.end_time) & Q(end_time__gt=self.start_time))

        if self.pk:
            overlapping = overlapping.exclude(pk=self.pk)

        if overlapping.exists():
            raise ValidationError("Ce créneau chevauche un autre créneau existant.")

    def __str__(self):
        return f"{self.doctor} "
