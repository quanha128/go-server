import string, random
from .models import *

def generate_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_letters, k=length))
        if Game.objects.filter(code = code).count() == 0:
            break
    return code