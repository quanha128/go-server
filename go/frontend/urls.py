
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('lobby', index),
    path('create-game', index),
    path('join-game', index),
    path('spectate-game', index),
    path('game/<str:gameId>', index),
]
