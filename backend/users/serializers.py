from .models import CustomedUser
from rest_framework import serializers
from django.contrib.auth import authenticate


class CustomedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomedUser
        fields = ["name", "phone_number"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomedUser
        fields = ("name", "phone_number", "password1", "password2")
        extra_kwargs = {
            "password1": {"write_only": True},
            "password2": {"write_only": True},
        }

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("Passwords do not match.")
        password = data.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )
        return data

    def create(self, validated_data):
        # user = CustomedUser(
        #     name=validated_data["name"],
        #     phone_number=validated_data["phone_number"],
        # )
        # user.set_password(validated_data["password1"])
        # user.save()
        # return user
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return CustomedUser.objects.create_user(
            password=password, username=validated_data["name"], **validated_data
        )


class UserLoginSerializer(serializers.Serializer):
    name = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")
