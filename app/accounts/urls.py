from django.urls import path, include
from knox import views as know_views
from .api import RegisterAPI, LoginAPI, UserAPI, ProfileAPI
from rest_framework import routers

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', know_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/profile', ProfileAPI.as_view()),
]
