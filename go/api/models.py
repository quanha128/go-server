from django.db import models
from datetime import datetime
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.utils import timezone
from django.contrib.auth.models import User as AuthUser
from django import forms
from django.contrib.auth.forms import UserCreationForm as Form

# Create your models here.

class Game(models.Model):
    id = models.CharField(default="", primary_key=True, max_length=6)
    board_state = """array"""
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()

class Player(AuthUser):
    is_playing = models.BooleanField(default=False)
    is_spectating = models.BooleanField(default=False)
    avatar_url = models.CharField(default="", max_length=500)
    elo = models.IntegerField(default=0)
    game_id = models.ForeignKey(Game, on_delete=CASCADE)
