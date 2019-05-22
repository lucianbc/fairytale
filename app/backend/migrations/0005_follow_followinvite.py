# Generated by Django 2.2.1 on 2019-05-22 13:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0004_story_published'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowInvite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inviteDate', models.DateTimeField(auto_now_add=True)),
                ('inviting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='invited_by', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inviting', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startDate', models.DateTimeField(auto_now_add=True)),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followed_by', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='following', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]