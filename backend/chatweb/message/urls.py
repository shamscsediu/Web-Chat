from django.urls import path
from . import views

urlpatterns = [
    # Message related
    path('message/entity', views.MessageList.as_view()),
    path('message/contacts', views.MessageContactList.as_view()),
    path('message/mark', views.MessageMark.as_view()),

    # # Authentication related
    # path('user/authenticate', views.UserAuthenticate.as_view()),
    #
    # # After authentication
    # path('user/movies', views.UserMovieList.as_view()),
]
