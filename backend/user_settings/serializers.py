from rest_framework import serializers
from .models import UserSetting


class UserSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSetting
        fields = ["id", "user", "preferences"]
        read_only_fields = ["user"]
