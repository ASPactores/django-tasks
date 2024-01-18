from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    token, _ = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    user_data = serializer.data
    user_data.pop("password", None)
    return Response({"token": token.key, "user": user_data}, status=status.HTTP_200_OK)


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.set_password(request.data["password"])
        user.save()
        token = Token.objects.create(user=user)
        user_data = serializer.data
        user_data.pop("password", None)
        return Response(
            {"token": token.key, "user": user_data}, status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["PUT"])
# def logout(request):
#     token = request.headers.get("Authorization").split(" ")[1]
#     print(Token.objects.filter(key=token))
#     return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def logout(request):
    authorization_header = request.headers.get("Authorization")

    if not authorization_header:
        return Response(
            {"error": "Authorization header is missing"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        _, token = authorization_header.split(" ")
    except ValueError:
        return Response(
            {"error": "Invalid Authorization header format"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not Token.objects.filter(key=token).exists():
        return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

    Token.objects.filter(key=token).delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def is_authenticated(_):
    return Response({"is_authenticated": True}, status=status.HTTP_200_OK)
