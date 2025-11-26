import json
from channels.generic.websocket import AsyncWebsocketConsumer


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.doctor_id = self.scope["url_route"]["kwargs"]["doctor_id"]
        self.room_group_name = f"doctor_{self.doctor_id}"

        # Rejoindre le groupe
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Quitter le groupe
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def send_notification(self, event):
        """Envoie la notification au WebSocket"""
        notification = event["notification"]

        # Envoyer le message au WebSocket
        await self.send(text_data=json.dumps({"notification": notification}))
