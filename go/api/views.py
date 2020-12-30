from django.shortcuts import render
from django.conf import settings
from rest_framework import serializers, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game, Account
from .serial import GameSerializer, CreateGameSerializer, SignupSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# Connect to our Redis instance
# conn = redis.StrictRedis(host=settings.REDIS_HOST,
#                         port=settings.REDIS_PORT, db=0)

class SignupView(generics.CreateAPIView):
    #queryset = Account.objects.all() # For DEBUG
    serializer_class = SignupSerializer

    def post(self, request, format=None):
        serializer = SignupSerializer(data=request.data)
        data={}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "Successfully registered a new account."
            data['username'] = account.username
            data['name'] = account.name
        else:
            data = serializer.errors
        return Response(data)

        


