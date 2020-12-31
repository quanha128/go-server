from django.urls import path, include
from .views import *
from rest_framework.authtoken.views import obtain_auth_token
import rest_framework

urlpatterns = [
    #path('games', GameView.as_view()),
    #path('create-game', CreateGameView.as_view()),
    #path('join-game', JoinGame.as_view()),
    path('signup', SignupView.as_view()),
    # path('login', obtain_auth_token),
    # path('users/', UserList.as_view()),
    # path('users/<int:pk>/', UserDetail.as_view()),
]