from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class UserMovie(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_movies')
    movie = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.movie
