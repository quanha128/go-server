from django.shortcuts import render
from django.conf import settings
from rest_framework import serializers, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Game
from .serial import GameSerializer, CreateGameSerializer

# Create your views here.

# Connect to our Redis instance
# conn = redis.StrictRedis(host=settings.REDIS_HOST,
#                         port=settings.REDIS_PORT, db=0)

class GameView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GetGame(APIView):
    serializer_class = GameSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            game = Game.objects.filter(code=code)
            if len(game) > 0:
                data = GameSerializer(game[0]).data
                data['is_host'] = self.request.session.session_key == game[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

# class JoinGame(APIView):
#     serializer_class = GameSerializer
#     lookup_url_kwarg = 'code'

#     def post(self, request, format=None):
#         code = request.GET.get(self.lookup_url_kwarg)
#         if code != None:
#             game = Game.objects.filter(code=code)
#             if len(game) > 0:
#                 data = GameSerializer(game[0]).data
#                 data['is_host'] = self.request.session.session_key == game[0].host
#                 return Response(data, status=status.HTTP_200_OK)
#             return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        
#         return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateGameView(APIView):
    serializer_class = CreateGameSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            board_size = serializer.data.get('board_size')
            can_spectate = serializer.data.get('can_spectate')
            board_state = "." * (board_size**2)
            host = self.request.session.session_key
            queryset = Game.objects.filter(host=host)
            if queryset.exists():
                game = queryset[0]
                game.can_spectate = can_spectate
                # game.board_size = board_size
                game.save(update_fields=['can_spectate'])
                return Response(GameSerializer(game).data, status=status.HTTP_200_OK)
            else:
                game = Game(host=host, can_spectate=can_spectate, board_size=board_size, board_state=board_state)
                game.save()
                return Response(GameSerializer(game).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)