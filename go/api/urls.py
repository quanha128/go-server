from django.urls import path
from .views import *

urlpatterns = [
    path('create-game/', GameView.as_view())
]