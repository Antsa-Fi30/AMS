from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import AppointmentViewSet, futur_plan

# from .views import create_checkout_session

router = DefaultRouter()
router.register(r"appointments", AppointmentViewSet, basename="appointments")

urlpatterns = [
    path("", include(router.urls)),
    path("doctor/futur/", futur_plan, name="Fetch futur appointment"),
    # path("doctor/appointments/", doctor_appointments, name="doctor-appointments"),
    # path(
    #     "create-checkout-session/",
    #     create_checkout_session,
    #     name="create-checkout-session",
    # ),
    # path("", include(router.urls)),
    # path(
    #     "appointments_accepted/",
    #     accepted_appointment,
    #     name="Return accepted appointments",
    # ),
]
