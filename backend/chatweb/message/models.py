from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiver')
    content = models.TextField()
    MESSAGE_STATUS = (
        (0, 'Unread'),
        (1, 'Read'),
    )
    status = models.SmallIntegerField(choices=MESSAGE_STATUS, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sender.first_name + ' ' + self.sender.last_name + ' to ' + self.receiver.first_name + ' ' + self.receiver.last_name


class Media(models.Model):
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='medias')
    media = models.FileField(upload_to='media/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.message.sender.first_name
