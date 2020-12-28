from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'id', 'board_size', 'code', 'host', 'can_spectate', 'time_start',
        )

class CreateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'board_size', 'can_spectate',
        )