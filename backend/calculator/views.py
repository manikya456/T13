from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Calculation
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(["POST"])
def calculate(request):
    user = request.user   # 🔥 logged-in user

    a = float(request.data.get("a"))
    b = float(request.data.get("b"))
    operation = request.data.get("operation")

    if operation == "add":
        result = a + b
    elif operation == "subtract":
        result = a - b
    elif operation == "multiply":
        result = a * b
    elif operation == "divide":
        if b == 0:
            return Response({"error": "Cannot divide by zero"})
        result = a / b
    else:
        return Response({"error": "Invalid operation"})

    Calculation.objects.create(
        user=user,
        number1=a,
        number2=b,
        operation=operation,
        result=result
    )

    return Response({"result": result})

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"})

    user = User.objects.create_user(username=username, password=password)
    token = Token.objects.create(user=user)

    return Response({
        "message": "User created",
        "token": token.key
    })

from django.contrib.auth import authenticate

@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"})

    token, created = Token.objects.get_or_create(user=user)

    return Response({
        "message": "Login successful",
        "token": token.key
    })

