from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from common.services import format_response, get_current_user
from message.serializers import *


class MessageList(APIView):

    def initial(self, request, *args, **kwargs):
        self.user_id = get_current_user(request)
        self.user = User.objects.get(pk=self.user_id)

    def get(self, request):
        receiver = request.query_params.get('receiver')
        messages = Message.objects.filter(Q(sender=self.user) | Q(receiver=self.user),
                                          Q(sender_id=receiver) | Q(receiver_id=receiver)).order_by('id')
        serializer = ConversationSerializer(messages, many=True)
        return Response(format_response(serializer.data, 'Success', 200), status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MessageCreateSerializer(data=request.data)
        if serializer.is_valid():
            msg = serializer.save(sender=self.user)
            if request.data.get('attachments'):
                for attachment in request.data.get('attachments'):
                    try:
                        Media.objects.create(message=msg, media=attachment)
                    except Exception as e:
                        pass
            return Response(format_response(ConversationSerializer(msg).data, 'Created', 201),
                            status=status.HTTP_201_CREATED)
        return Response(format_response(serializer.errors, 'Bad Request', 400), status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        message = Message.objects.get(pk=pk, sender=self.user)
        serializer = MessageUpdateSerializer(message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(format_response(serializer.data, 'Updated', 200), status=status.HTTP_200_OK)
        return Response(format_response(serializer.errors, 'Bad Request', 400), status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        message = Message.objects.get(pk=pk, sender=self.user)
        message.delete()
        return Response(format_response([], 'Deleted', 204), status=status.HTTP_204_NO_CONTENT)
