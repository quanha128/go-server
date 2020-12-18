from django.shortcuts import render
import json
from django.conf import settings
import redis
from rest_framework.decorators import api_view
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework import generics
from .models import Game
from .serial import GameSerializer

# Create your views here.

# Connect to our Redis instance
# conn = redis.StrictRedis(host=settings.REDIS_HOST,
#                         port=settings.REDIS_PORT, db=0)

class GameView(generics.CreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
