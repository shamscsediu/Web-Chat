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
        unseen_count = Message.objects.filter(sender_id=receiver, receiver_id=self.user_id, status=0).count()
        serializer = ConversationSerializer(messages, many=True)
        return Response(format_response(serializer.data, 'Success', 200, unseen_count), status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MessageCreateSerializer(data=request.data)
        if serializer.is_valid():
            # get attachments
            attachments = request.FILES.getlist('attachments')

            if attachments:
                # delete attachments from validated data if provided
                del serializer.validated_data['attachments']
                msg = serializer.save(sender=self.user)

                for attachment in attachments:
                    try:
                        Media.objects.create(message=msg, media=attachment)
                    except Exception as e:
                        pass
            else:
                msg = serializer.save(sender=self.user)
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


class MessageContactList(APIView):

    def initial(self, request, *args, **kwargs):
        self.user_id = get_current_user(request)
        self.user = User.objects.get(pk=self.user_id)

    def get(self, request):
        users_list_1 = Message.objects.filter(receiver=self.user).values_list('sender_id', flat=True).distinct()
        users_list_2 = Message.objects.filter(sender=self.user).values_list('receiver_id', flat=True).distinct()
        users_list = list(users_list_1) + list(users_list_2)
        print(users_list)
        users = User.objects.filter(pk__in=users_list)
        serializer = UserDataSerializer(users, many=True)
        return Response(format_response(serializer.data, 'Success', 200), status=status.HTTP_200_OK)


# Mark as read
class MessageMark(APIView):

    def initial(self, request, *args, **kwargs):
        self.user_id = get_current_user(request)
        self.user = User.objects.get(pk=self.user_id)

    def post(self, request):
        receiver = request.data.get('receiver')
        if receiver:
            messages = Message.objects.filter(sender_id=receiver, receiver_id=self.user_id, status=0).update(status=1)
            return Response(format_response([], 'Success', 200),
                            status=status.HTTP_200_OK)
        else:
            return Response(format_response([], 'Bad Request', 400),
                            status=status.HTTP_400_BAD_REQUEST)
