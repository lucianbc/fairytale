from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Profile
from datetime import datetime, date
# Profile Serializer


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('bio', 'location', 'birthDate', 'avatar')

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'first_name', 'last_name', 'profile', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        if 'password' in validated_data.keys():
            instance.set_password(validated_data.get('password'))
        instance.save()

        profile_data = validated_data.pop('profile', None)
        if profile_data is not None:
            profile = instance.profile
            profile.bio = profile_data.get('bio', profile.bio)
            profile.location = profile_data.get('location', profile.location)
            profile.birthDate = profile_data.get(
                'birthDate', profile.birthDate)
            if profile.birthDate == date(1, 1, 1):
                profile.birthDate = None
            profile.avatar = profile_data.get('avatar', profile.avatar)
            profile.save()

        return instance

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])
        Profile.objects.create(user=user)
        return user

# Login Serializer


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect username/password")
