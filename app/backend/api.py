from backend.models import Story, Follow, FollowInvite
from rest_framework import viewsets, permissions
from .serializers import StorySerializer, FollowSerializer, FollowInviteSerializer
from django.contrib.auth.models import User
from .models import Story
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

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

    serializer_class = FollowSerializer

    def get_queryset(self):
        return self.request.user.following.all()

    def create(self, request, *args, **kwargs):

        username = request.data.get("followUsername")
        try:
            following = User.objects.get(username=username).id
        except ObjectDoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        invalid = user.following.all().filter(following=following)
        if invalid:
            return Response({"error": "Already following " + invalid[0].following.username}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(
            data={"following": following, "user": request.user.id})
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowInviteViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FollowInviteSerializer

    def get_queryset(self):
        return self.request.user.inviting.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FeedViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StorySerializer
    #serializer_class = FollowSerializer

    def get_queryset(self):
        stories = Story.objects.none()
        followers = self.request.user.following.all()
        for follower in followers:
            userFollowed = follower.following
            stories = stories | userFollowed.stories.all()
        return stories

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
