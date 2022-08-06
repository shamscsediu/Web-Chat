from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.services import get_tokens_for_user, format_response
from user.serializers import *


class UserRegister(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        user = {
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'email': request.data.get('email').lower(),
            'username': request.data.get('username'),
            'password': make_password(request.data.get('password')),
            'is_active': True
        }

        user_serializer = UserSerializer(data=user)
        if user_serializer.is_valid():
            user = user_serializer.save()

            # Removing password field from response
            user_data = user_serializer.data.copy()
            user_data.pop('password', None)

            return Response(format_response(user_data, 'Created', 201), status=status.HTTP_201_CREATED)
        else:
            return Response(format_response(user_serializer.errors, 'Bad Request', 400),
                            status=status.HTTP_400_BAD_REQUEST)


class UserAuthenticate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = UserAuthenticateSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(request, email=request.data.get('email'), password=request.data.get('password'))
            if user:
                # Remove Password from Payload
                user_data = UserDataSerializer(user).data.copy()
                user_data.pop('password', None)

                # Last login
                user.last_login = timezone.now()
                user.save()

                user_data['token'] = get_tokens_for_user(user)

                return Response(format_response(user_data, 'Success', 200), status=status.HTTP_200_OK)
            else:
                return Response(format_response([], 'Not Found', 404), status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(format_response(serializer.errors, 'Bad Request', 400), status=status.HTTP_400_BAD_REQUEST)
