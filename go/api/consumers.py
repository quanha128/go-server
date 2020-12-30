import json
from channels.generic.websocket import AsyncWebsocketConsumer, AsyncJsonWebsocketConsumer
from rest_framework.status import HTTP_202_ACCEPTED
from .models import *

class GoConsumer(AsyncJsonWebsocketConsumer):
    # def __init__(self, code):
    #     self.games = Game.objects.filter(code=code)

    # naive implementation
    async def connect(self):
        self.code = self.scope['url_route']['kwargs']['code']
        self.game = Game.objects.filter(code=self.code)[0]
        self.game_group_name = 'game_%s' % self.game.name

        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )

        await self.accept()
    
    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.game_group_name,
            self.channel_name
        )

    # Receive play move from player
    async def receive(self, board_state):
        # Decode board state from JSON
        await self.receive_json(board_state)

        # Change board state on db
        self.game.board_state = board_state
        new_state = self.game.board_state

        # Send the updated board state to both players
        await self.channel_layer.group_send(
            self.game_group_name,
            {
                'type': 'play_move',
                'board_state': new_state
            }
        )

    # Receive play move from game group
    async def play_move(self, event):
        move = event['board_state']

        # Send message to WebSocket
        await self.send_json(move)