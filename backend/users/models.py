from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class CustomedUser(AbstractUser):
    name = models.CharField(max_length=255, blank=False, null=False, unique=True)
    phone_number = models.CharField(max_length=7, blank=False, null=False, unique=True)
    password = models.CharField(max_length=128, blank=False, null=False)
    USERNAME_FIELD = "name"
    REQUIRED_FIELDS = ["username"]

    def __str__(self) -> str:
        return self.name
