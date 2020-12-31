from django.shortcuts import render
from django.conf import settings
from rest_framework import serializers, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game, Account
from .serial import GameSerializer, CreateGameSerializer, LoginSerializer, SignupSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# Create your views here.

# Connect to our Redis instance
# conn = redis.StrictRedis(host=settings.REDIS_HOST,
#                         port=settings.REDIS_PORT, db=0)

# @api_view(['POST'])
# def registration_view(request):
#     #queryset = Account.objects.all() # For DEBUG
#     if request.method == 'POST':
#         serializer = SignupSerializer(data=request.data)
#         data={}
#         print(request.data)
#         if serializer.is_valid():
#             account = serializer.save()
#             data['response'] = "Successfully registered a new account."
#             data['username'] = account.username
#             data['name'] = account.name
#             token = Token.objects.get(user=account).key
#             data['token'] = token
#         else:
#             data = serializer.errors
#         return Response(data)

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
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

class UserList(generics.ListAPIView):
    queryset = Account.objects.all()
    serializer_class = LoginSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = LoginSerializer

class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        data={}

        # user = SessionAuthentication.authenticate(request)
        # if user != None:
        #     data['user'] = user
        #     return Response(data)
        # else:
        #     pass
        
        if serializer.is_valid():
            user = BasicAuthentication(request)
            print(user)
            if user == None:
                data['response'] = 'User not found'
                return Response(data, status=status.HTTP_404_NOT_FOUND)
            else:
                data['username'] = user.username
                data['response'] = 'Hello' + user.username
                return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({'Not Found': 'Bs'}, status=status.HTTP_404_NOT_FOUND)