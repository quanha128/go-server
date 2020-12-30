from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'id', 'board_size', 'code', 'chat_channel_code', 'host', 'can_spectate', 'time_start', 'board_state',
        )

class UpdateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('code', 'board_state')
        
class CreateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'board_size', 'can_spectate',
        )