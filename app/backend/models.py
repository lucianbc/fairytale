from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Story(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)
    content = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User,
                               related_name="stories",
                               on_delete=models.CASCADE,
                               null=True)
    creationDate = models.DateTimeField(auto_now_add=True)
    lastEditDate = models.DateTimeField(auto_now=True)
    published =  models.BooleanField(default=False)