import string, random
from .models import *

def generate_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_letters, k=length))
        if Player.objects.filter(id = code).count() == 0:
            break
    return code