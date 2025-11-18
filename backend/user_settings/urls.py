from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user_settings.views import UserSettingViewSet

router = DefaultRouter()
router.register("user_settings", UserSettingViewSet, basename="user_settings")

urlpatterns = [
    path("", include(router.urls)),
]
