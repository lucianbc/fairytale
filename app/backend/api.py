from backend.models import Story
from rest_framework import viewsets, permissions
from .serializers import StorySerializer

# Story Viewset


class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = StorySerializer

    def get_queryset(self):
        return self.request.user.stories.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
