from rest_framework import routers
from .api import StoryViewSet

router = routers.DefaultRouter()
router.register('api/stories', StoryViewSet, 'stories')

urlpatterns = router.urls
