
from django.urls import path
from .views import calculate, register, login

urlpatterns = [
    path("register/", register),
    path("login/", login),
    path("calculate/", calculate),
]
