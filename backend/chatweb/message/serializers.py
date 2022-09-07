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
    attachments = serializers.FileField(allow_empty_file=True, required=False)

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
        fields = ('id', 'user', 'content', 'status', 'attachments', 'created_at', 'updated_at')

# class ContactSerializer(serializers.ModelSerializer):
#     user = serializers.SerializerMethodField()
#
#     def get_user(self, obj):
#         users_list_1 = Message.objects.filter(receiver=self.user).values_list('sender_id', flat=True).distinct()
#         users_list_2 = Message.objects.filter(sender=self.user).values_list('receiver_id', flat=True).distinct()
#         users_list = list(users_list_1) + list(users_list_2)
#         return UserDataSerializer(obj.sender).data
#
#     class Meta:
#         model = Message
#         fields = ('id', 'user', 'status', 'created_at', 'updated_at')
