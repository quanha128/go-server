import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer, JsonWebsocketConsumer
from rest_framework.status import HTTP_202_ACCEPTED
from .models import *
from .go_board_helper.go import Position, BLACK, WHITE, IllegalMove

class GoConsumer(JsonWebsocketConsumer):
    # naive implementation
     def connect(self):
        self.code = self.scope['url_route']['kwargs']['code']
        self.game = Game.objects.filter(code=self.code)[0]
        self.position = Position(board=self.game.board_state, ko=self.game.ko)
        self.game_group_name = 'game_%s' % self.game.code

        async_to_sync(self.channel_layer.group_add)(
            self.game_group_name,
            self.channel_name
        )

        self.accept()
    
     def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.game_group_name,
            self.channel_name
        )

    # Receive play move from player
     def receive(self, text_data):
        # Decode board state from JSON
        text_data_json = json.loads(text_data)
        # Change board state on db
        try:
            position = self.position.play_move(fc=text_data_json["ko"], color=text_data_json["color"])
        except IllegalMove as error:
            self.send(text_data=json.dumps({'message': str(error)}))
        else:
            self.position = position
            self.game.board_state = self.position.get_board()
            new_state = self.game.board_state
            self.game.save(update_fields=['board_state'])
            # Send the updated board state to both players
            async_to_sync(self.channel_layer.group_send)(
                self.game_group_name,
                {
                    'type': 'play_move',
                    'board_state': new_state
                }
            )

    # Receive play move from game group
     def play_move(self, event):
        move = event['board_state']

        # Send message to WebSocket
        self.send(text_data=json.dumps({'board_state': event["board_state"]}))

class ChatConsumer(JsonWebsocketConsumer):
     def connect(self):
        self.chat_channel_code = self.scope['url_route']['kwargs']['chat_channel_code']
        self.chat_group_name = 'chat_%s' % self.chat_channel_code

        async_to_sync(self.channel_layer.group_add)(
            self.chat_group_name,
            self.channel_name
        )

        self.accept()
    
     def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.chat_group_name,
            self.channel_name
        )

    # Receive play move from player
     def receive(self, text_data):
        # Get message JSON
        text_data_json = json.loads(text_data)
        # Create new chatline entry
        message = text_data_json["message"]
        chat_line = Chatline(line=message, chat_channel_code=self.chat_channel_code)
        chat_line.save()
    
        # Send the updated board state to both players
        async_to_sync(self.channel_layer.group_send)(
            self.chat_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    # Receive play move from game group
     def chat_message(self, event):
        move = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps({'message': event["message"]}))