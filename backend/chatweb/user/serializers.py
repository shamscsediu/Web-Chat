from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator

from user.models import UserMovie


class UserSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255, validators=[
        UniqueValidator(queryset=User.objects.all(), message='A user with that email already exists.')])

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'is_active', 'last_login']


class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'is_active', 'last_login']


class UserAuthenticateSerializer(serializers.ModelSerializer):
    email = serializers.CharField(read_only=False)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserMoviesSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserMovie
        fields = ['id', 'user', 'movie']
