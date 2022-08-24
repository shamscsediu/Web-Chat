from django.urls import path
from . import views

urlpatterns = [
    # Register related
    path('message/entity', views.MessageList.as_view()),

    # # Authentication related
    # path('user/authenticate', views.UserAuthenticate.as_view()),
    #
    # # After authentication
    # path('user/movies', views.UserMovieList.as_view()),
]
