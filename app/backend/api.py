from backend.models import Story, Follow, FollowInvite
from rest_framework import viewsets, permissions
from .serializers import StorySerializer, FollowSerializer, FollowSerializerForAdd, FollowInviteSerializer, FollowInviteSerializerForAdd
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from accounts.serializers import UserSerializer
from rest_framework.decorators import list_route
import rest_framework.renderers as renderers

# Story Viewset


class StoryViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StorySerializer

    def get_queryset(self):
        return self.request.user.stories.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)


class FollowViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FollowSerializer

        return FollowSerializerForAdd

    def get_queryset(self):

        follow_relations = self.request.user.following.all(
        ) | self.request.user.followed_by.all()

        return follow_relations

    def create(self, request, *args, **kwargs):

        username = request.data.get("followUsername")
        try:
            following = User.objects.get(username=username).id
        except ObjectDoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(
            data={"following": following, "user": request.user.id})
        serializer.is_valid(raise_exception=True)

        # self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @list_route(methods=['POST'], renderer_classes=[renderers.JSONRenderer])
    def acceptFollower(self, request, *args, **kwargs):

        idUserWhoSentInvite = request.data.get("idUserWhoSentInvite")

        serializer = self.get_serializer(
            data={"following": request.user.id, "user": idUserWhoSentInvite})
        serializer.is_valid(raise_exception=True)

        follower = serializer.save()
        # self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(FollowSerializer(follower).data, status=status.HTTP_201_CREATED, headers=headers)


class FollowInviteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FollowInviteSerializer
        return FollowInviteSerializerForAdd

    def get_queryset(self):
        return self.request.user.inviting.all() | self.request.user.invited_by.all()

    def create(self, request, *args, **kwargs):

        username = request.data.get("invitedUsername")
        try:
            inviting = User.objects.get(username=username).id
        except ObjectDoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        invalid = user.inviting.all().filter(inviting=inviting)
        invalid2 = user.following.all().filter(following=inviting)
        if invalid:
            return Response({"already_invited": [" " + invalid[0].inviting.username + " is already invited!"]}, status=status.HTTP_404_NOT_FOUND)
        if invalid2:
            return Response({"already_followed": [" " + invalid2[0].following.username + " is already followed!"]}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(
            data={"inviting": inviting, "user": user.id})
        serializer.is_valid(raise_exception=True)

        # self.perform_create(serializer)
        currentInvite = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(FollowInviteSerializer(currentInvite).data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FeedViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StorySerializer

    def get_queryset(self):
        stories = Story.objects.none()
        followers = self.request.user.following.all()
        for follower in followers:
            userFollowed = follower.following
            stories = stories | userFollowed.stories.all()
        return stories

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
