# groupmaster/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupMasterViewSet

router = DefaultRouter()
router.register(r'groupmaster', GroupMasterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
