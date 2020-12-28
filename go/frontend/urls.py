
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('lobby', index),
    path('game/<str:gameId>', index),
]
