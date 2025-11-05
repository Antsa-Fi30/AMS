from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import DisponibilityViewSet

# from .views import create_checkout_session

router = DefaultRouter()
router.register(r"disponibility", DisponibilityViewSet, basename="disponibilities")

urlpatterns = [
    path("", include(router.urls)),
]
