from rest_framework import serializers
<<<<<<< HEAD
from .models import Game
=======
from .models import Game,Player,Account
>>>>>>> abc2fce016faeaa9b9b8f07b698df746ed2a443b

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
<<<<<<< HEAD
            'id', 'board_size', 'code', 'chat_channel_code', 'host', 'can_spectate', 'time_start', 'board_state',
        )

class UpdateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('code', 'board_state')
        
=======
            'id', 'board_size', 'code', 'host', 'can_spectate', 'time_start',
        )

>>>>>>> abc2fce016faeaa9b9b8f07b698df746ed2a443b
class CreateGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'board_size', 'can_spectate',
<<<<<<< HEAD
        )
=======
        )

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'id', 'game_id', 'is_playing', 'is_spectating', 'chat_id', 'avatar_url',
            'elo',
        )

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = Account
        fields = ['username', 'name', 'password', 'password2']
        extra_kwargs={
            'password': {'write_only': True}
        }
    
    def save(self):
        account = Account(
            username = self.validated_data['username']
        )
        name = self.validated_data['name']
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
    
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match'})
        account.set_password(password)

        if name != "":
            account.name = name

        account.save()
        return account

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'password']
>>>>>>> abc2fce016faeaa9b9b8f07b698df746ed2a443b
