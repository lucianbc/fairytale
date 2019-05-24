from rest_framework import serializers
from .models import Story, Follow, FollowInvite
from accounts.serializers import UserSerializer


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'


class FollowSerializer(serializers.ModelSerializer):

    following = UserSerializer()

    class Meta:
        model = Follow
        fields = ('id', 'following')


class FollowSerializerForAdd(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = '__all__'


class FollowInviteSerializer(serializers.ModelSerializer):

    inviting = UserSerializer()
    user = UserSerializer()

    class Meta:
        model = FollowInvite
        fields = ('id', 'user', 'inviting')


class FollowInviteSerializerForAdd(serializers.ModelSerializer):

    class Meta:
        model = FollowInvite
        fields = '__all__'


class Example(serializers.ModelSerializer):

    class Meta:
        model = FollowInvite
        fields = ('id',)
