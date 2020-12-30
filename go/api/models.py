from django.db import models
# from django.contrib.postgres.fields import ArrayField
# from .helper import *
import string, random

BOARD_SIZE = 19

def generate_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_letters, k=length))
        if Game.objects.filter(code = code).count() == 0:
            break
    return code

# Create your models here.
class Player(models.Model):
    game_id = models.ForeignKey('Game', on_delete = models.SET_NULL, blank = True, null = True)
    is_playing = models.BooleanField(null= False, default = False)
    is_spectating = models.BooleanField(null= False, default = False)
    chat_id = models.ForeignKey('Chatline', on_delete = models.SET_NULL, blank = True, null = True)
    avatar_url = models.CharField(max_length=255, default="")
    elo = models.IntegerField(null=False, default = 1000)

class Game(models.Model):
    # player1_id = models.ForeignKey(Player, related_name="P1", on_delete = models.SET_NULL, blank = True, null = True)
    # player2_id = 
    board_state = models.CharField(default="", max_length=BOARD_SIZE**2)
    code = models.CharField(default=generate_code, unique=True, max_length=6)
    host = models.CharField(max_length=10, unique=True)
    can_spectate = models.BooleanField(default=False, null=False)
    board_size = models.IntegerField(null=False, default=19)
    #player_turn = models.IntergerField(null=False, defalut = 0)
    time_start = models.DateTimeField(auto_now_add = True)
    # time_end = models.DateTimeField(auto_now_add = True)

class Chatline(models.Model):
    game_id = models.ForeignKey(Game, on_delete = models.CASCADE)
    chat_id = models.CharField(max_length=255, default="")
    sayer = models.ForeignKey(Player, on_delete = models.SET_NULL, blank = True, null = True)
    line = models.CharField(max_length=255, default="")
    time = models.DateTimeField(auto_now_add = True)