from django.conf import settings
from django.utils import timezone
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json


def send_doctor_notification(appointment, notification_type="appointment_cancelled"):
    """Envoie une notification push au docteur"""
    try:
        # Vérifications de base
        if not appointment or not hasattr(appointment, "doctor"):
            print("Erreur: Rendez-vous ou docteur manquant")
            return False

        channel_layer = get_channel_layer()
        doctor_channel_name = f"doctor_{appointment.doctor.id}"

        # Messages selon le type de notification
        messages = {
            "appointment_cancelled": f"Le patient {appointment.patient.name} a annulé son rendez-vous du {appointment.date}",
            "appointment_created": f"Nouveau rendez-vous avec {appointment.patient.name} le {appointment.date}",
            "appointment_updated": f"Rendez-vous modifié avec {appointment.patient.name} pour le {appointment.date}",
        }

        notification_data = {
            "type": notification_type,
            "message": messages.get(notification_type, "Nouvelle notification"),
            "appointment_id": appointment.id,
            "patient_name": getattr(appointment.patient, "name", "Patient"),
            "date": appointment.date.strftime("%d/%m/%Y") if appointment.date else "",
            "timestamp": timezone.now().isoformat(),
        }

        # Envoyer via WebSocket
        async_to_sync(channel_layer.group_send)(
            doctor_channel_name,
            {"type": "send_notification", "notification": notification_data},
        )

        print(f"✅ Notification envoyée au docteur {appointment.doctor.name}")
        return True

    except Exception as e:
        print(f"❌ Erreur envoi notification: {str(e)}")
        return False
