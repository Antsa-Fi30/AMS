from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomedUser(AbstractUser):
    ROLE_CHOICES = (
        ("doctor", "Doctor"),
        ("patient", "Patient"),
    )
    name = models.CharField(max_length=255, blank=False, null=False, unique=True)
    phone_number = models.CharField(max_length=13, blank=False, null=False, unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)
    role = models.CharField(choices=ROLE_CHOICES, default="doctor")
    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        return self.name
