# Generated by Django 3.1.4 on 2021-01-01 09:25

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Chatline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_id', models.CharField(default='', max_length=255)),
                ('line', models.CharField(default='', max_length=255)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('board_state', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(default=0), size=19), size=19)),
                ('time_start', models.DateTimeField(auto_now_add=True)),
                ('time_end', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_playing', models.BooleanField(default=False)),
                ('is_spectating', models.BooleanField(default=False)),
                ('avatar_url', models.CharField(default='', max_length=255)),
                ('elo', models.IntegerField(default=1000)),
                ('chat_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='frontend.chatline')),
                ('game_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='frontend.game')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='player1_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='P1', to='frontend.player'),
        ),
        migrations.AddField(
            model_name='game',
            name='player2_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='P2', to='frontend.player'),
        ),
        migrations.AddField(
            model_name='chatline',
            name='game_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.game'),
        ),
        migrations.AddField(
            model_name='chatline',
            name='sayer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='frontend.player'),
        ),
    ]
