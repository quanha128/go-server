from django.urls import path
from .views import *

urlpatterns = [
    path('games', GameView.as_view()),
    path('get-game', GetGame.as_view()),
    path('create-game', CreateGameView.as_view()),
    path('join-game', JoinGame.as_view()),
    path('update-game', UpdateGame.as_view()),
]