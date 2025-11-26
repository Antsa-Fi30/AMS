from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/notifications/doctor_(?P<doctor_id>\d+)/$",  # ← \d+ pour numérique
        consumers.NotificationConsumer.as_asgi(),
    ),
]
