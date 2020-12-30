from django.db import models
from api.models import *
from django.contrib.auth.models import User

# Create your models here.

class Player(User):
    # is_playing = models.BooleanField(null= False, default = False)
    # is_spectating = models.BooleanField(null= False, default = False)
    # chat_id = models.ForeignKey('Chatline', on_delete = models.SET_NULL, blank = True, null = True)
    avatar_url = models.CharField(max_length=255, default="")
    elo = models.IntegerField(null=False, default = 0)