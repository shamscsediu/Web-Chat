from django.contrib.auth import get_user_model
from django.contrib.auth.models import User


class EmailOrUsernameBackend(object):
    def authenticate(self, request, email=None, password=None):
        UserModel = get_user_model()
        kwargs = {'email': email} if '@' in email else {'username': email}

        try:
            user = UserModel.objects.get(**kwargs)
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password) and user.is_active:
                return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
