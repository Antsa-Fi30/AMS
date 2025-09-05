from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", UserLoginAPIView.as_view(), name="authentication"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
