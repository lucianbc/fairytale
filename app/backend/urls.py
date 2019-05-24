from rest_framework import routers
from .api import StoryViewSet, FollowViewSet, FollowInviteViewSet

router = routers.DefaultRouter()
router.register('api/stories', StoryViewSet, 'stories'),
router.register('api/follows', FollowViewSet, 'follows'),
router.register('api/invites', FollowInviteViewSet, 'invites')

urlpatterns = router.urls
