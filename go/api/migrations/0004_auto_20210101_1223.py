# Generated by Django 3.1.4 on 2021-01-01 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_chatline_sender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatline',
            name='sender',
            field=models.CharField(max_length=32),
        ),
    ]
