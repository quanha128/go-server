from django.shortcuts import render
from django.conf import settings
from rest_framework import serializers, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game
from .serial import GameSerializer, CreateGameSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# Connect to our Redis instance
# conn = redis.StrictRedis(host=settings.REDIS_HOST,
#                         port=settings.REDIS_PORT, db=0)

class SignupView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)


