from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    AppointmentViewSet,
    futur_plan,
    get_doctor_stats,
    delete_records,
    last_appointment,
    ticket_queue,
)

# from .views import create_checkout_session

router = DefaultRouter()
router.register(r"appointments", AppointmentViewSet, basename="appointments")

urlpatterns = [
    path("", include(router.urls)),
    path("appointments/doctor/futur/", futur_plan, name="Fetch futur appointment"),
    path(
        "appointments/doctor/stats/",
        get_doctor_stats,
        name="Fetch stats doctor appointment",
    ),
    path(
        "appointments/doctor/queue/",
        ticket_queue,
        name="Fetch doctor appointments with queuing",
    ),
    path(
        "appointments/patient/erase/",
        delete_records,
        name="Delete all records finished",
    ),
    path(
        "appointments/patient/last/",
        last_appointment,
        name="Delete all records finished",
    ),
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
