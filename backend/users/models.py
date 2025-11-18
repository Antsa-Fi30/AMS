from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomedUser(AbstractUser):
    ROLE_CHOICES = (
        ("doctor", "Doctor"),
        ("patient", "Patient"),
    )

    username = None  # ← DISPARAIT complètement
    first_name = None
    last_name = None

    name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=13, unique=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="doctor")

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []  # ← rien d'autre requis pour create_superuser

    def __str__(self):
        return self.name
