from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

# from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import Appointment
from .serializers import AppointmentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from django.utils import timezone
from datetime import date, time, timedelta
from django.db.models import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Appointment

# from django.conf import settings
# from asgiref.sync import async_to_sync
# import traceback

# import stripe
# from channels.layers import get_channel_layer


# stripe.api_key = settings.STRIPE_SECRET_KEY

User = get_user_model()


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        many = isinstance(request.data, list)
        serializer = self.get_serializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def get_queryset(self):
        user = self.request.user
        if user.role == "doctor":
            return Appointment.objects.filter(doctor_id=user.id)
        elif user.role == "patient":
            return Appointment.objects.filter(patient_id=user.id)
        else:
            return Appointment.objects.none()

    def update(self, request, *args, **kwargs):
        # if "status" in request.data:
        #     if request.user.role not in ["admin", "doctor"]:
        #         return Response(
        #             {"detail": "Non autorisé à changer le statut."},
        #             status=status.HTTP_403_FORBIDDEN,
        #         )

        return super().update(request, *args, **kwargs)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def accepted_appointment(request):
    user = request.user

    if user.role != "admin":
        return Response({"detail": "Non autorisé."}, status=status.HTTP_403_FORBIDDEN)

    appointments = Appointment.objects.filter(status="accepted")
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def appointment_stats(request):
    today = date.today()

    patients_today = (
        Appointment.objects.filter(date=today).values("patient").distinct().count()
    )

    scheduled = Appointment.objects.filter(date=today, status__in=["confirmed"]).count()

    finished = Appointment.objects.filter(date=today, status="rejected").count()

    emergencies = Appointment.objects.filter(
        date=today, reason__icontains="urgence"
    ).count()

    next_appointment = (
        Appointment.objects.filter(
            date=today, status="confirmed", time__gte=time.today()
        )
        .order_by("time")
        .first()
    )

    last_finished = (
        Appointment.objects.filter(date=today, status="rejected")
        .order_by("-time")
        .first()
    )

    return Response(
        {
            "patients_today": patients_today,
            "scheduled": scheduled,
            "finished": finished,
            "emergencies": emergencies,
            "next_time": next_appointment.time if next_appointment else None,
            "last_finished": last_finished.time if last_finished else None,
        }
    )


@api_view(["GET"])
def futur_plan(request):
    if not request.user.is_authenticated:
        return Response({"error": "Authentication required"}, status=401)

    today = timezone.now().date()

    upcoming_appointments = Appointment.objects.filter(
        doctor=request.user,
        status="confirmed",
        finished=False,
        date__gt=today,
        date__lte=today + timedelta(days=7),
    ).order_by("date", "time")

    from collections import defaultdict

    daily_stats = defaultdict(list)

    for appointment in upcoming_appointments:
        daily_stats[appointment.date].append(appointment)

    planning_data = []
    for date, appointments in sorted(daily_stats.items())[:3]:
        rdv_count = len(appointments)
        day_type = "Demi-journée" if rdv_count <= 4 else "Journée complète"

        planning_data.append(
            {
                "day_number": date.day,
                "date_display": date.strftime("%A %d %b"),
                "rdv_count": rdv_count,
                "day_type": day_type,
                # "appointments": [
                #     {
                #         "date": apt.date,
                #         "time": apt.time.strftime("%H:%M") if apt.time else "",
                #         "patient": apt.patient.get_full_name() or apt.patient.username,
                #         "reason": apt.reason or "Consultation",
                #     }
                #     for apt in appointments
                # ],
            }
        )

    return Response(planning_data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_doctor_stats(request):
    doctor = request.user
    today = timezone.now().date()

    today_patients = (
        Appointment.objects.filter(doctor=doctor, date=today, status="confirmed")
        .values("patient")
        .distinct()
        .count()
    )

    upcoming_appointments = Appointment.objects.filter(
        doctor=doctor,
        date__gte=today,
        date__lte=today + timedelta(days=7),
        status="confirmed",
        finished=False,
    ).count()

    finished_consultations = Appointment.objects.filter(
        doctor=doctor,
        status="confirmed",
        date__gte=today,
        date__lte=today + timedelta(days=7),
        finished=True,
    ).count()

    return Response(
        {
            "patients": today_patients,
            "scheduled": upcoming_appointments,
            "finished": finished_consultations,
        }
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_records(request):
    deleted_count, _ = Appointment.objects.filter(
        patient=request.user.id, finished=True
    ).delete()
    return Response(
        {"message": f"{deleted_count} rendez-vous supprimés."},
        status=status.HTTP_200_OK,
    )


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_checkout_session(request):
#     try:
#         print("Données reçues pour Stripe:", request.data)
#         checkout_session = stripe.checkout.Session.create(
#             payment_method_types=["card"],
#             line_items=[
#                 {
#                     "price_data": {
#                         "currency": "usd",
#                         "product_data": {
#                             "name": "Consultation médicale (50%)",
#                         },
#                         "unit_amount": int(round(1.086 * 100)),
#                     },
#                     "quantity": 1,
#                 },
#             ],
#             mode="payment",
#             success_url="http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
#             cancel_url="http://localhost:5173/patient/appointment",
#             metadata={
#                 "user_id": request.user.id,
#                 "title": request.data.get("title"),
#                 "description": request.data.get("description"),
#                 "doctor_id": request.data.get("doctorId"),
#             },
#         )
#         return Response({"url": checkout_session.url})
#     except Exception as e:
#         print("Erreur Stripe:", str(e))
#         traceback.print_exc()
#         return Response({"error": str(e)}, status=500)
