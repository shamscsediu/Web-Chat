from rest_framework import serializers

from common.services import get_current_user
from message.models import *
from user.serializers import UserDataSerializer


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ('id', 'message', 'media', 'created_at', 'updated_at')


class MessageSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField()

    def get_attachments(self, obj):
        return MediaSerializer(obj.medias.all(), many=True).data

    class Meta:
        model = Message
        fields = ('id', 'sender', 'receiver', 'attachments', 'content', 'created_at', 'updated_at')


class MessageCreateSerializer(serializers.ModelSerializer):
    attachments = serializers.FileField(allow_empty_file=True, use_url=True, required=False)

    class Meta:
        model = Message
        fields = ('receiver', 'content', 'attachments')


class MessageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = 'content'


class ConversationSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    attachments = serializers.SerializerMethodField()

    def get_attachments(self, obj):
        return MediaSerializer(obj.medias.all(), many=True).data

    def get_user(self, obj):
        return UserDataSerializer(obj.sender).data

    class Meta:
        model = Message
        fields = ('id', 'user', 'content', 'attachments', 'created_at', 'updated_at')
