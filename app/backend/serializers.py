from rest_framework import serializers
from .models import Story, Follow, FollowInvite


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = '__all__'


class FollowInviteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowInvite
        fields = '__all__'
