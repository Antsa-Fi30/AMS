from django.db import models
from django.conf import settings


class UserSetting(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="settings"
    )
    preferences = models.JSONField(default=dict)

    def __str__(self):
        return f"Settings for {self.user.username}"
