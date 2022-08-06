from django.urls import path
from . import views

urlpatterns = [
    # Register related
    path('user/register', views.UserRegister.as_view()),

    # Authentication related
    path('user/authenticate', views.UserAuthenticate.as_view())
]
