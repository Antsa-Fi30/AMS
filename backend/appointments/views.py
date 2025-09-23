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
    # permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
    #     user = self.request.user
    #     if user.role == "doctor":
    #         return Appointment.objects.filter(doctor=user)
    #     elif user.role == "patient":
    #         return Appointment.objects.filter(patient=user)
    #     else:
    #         return Appointment.objects.none()

    def update(self, request, *args, **kwargs):
        # admin sy doko ihany no afaka manova statut
        if "status" in request.data:
            if request.user.role not in ["admin", "doctor"]:
                return Response(
                    {"detail": "Non autorisé à changer le statut."},
                    status=status.HTTP_403_FORBIDDEN,
                )

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
