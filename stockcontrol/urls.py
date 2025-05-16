# stockcontrol/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupMasterViewSet, TypeMasterViewSet, CategoryMasterViewSet

router = DefaultRouter()
router.register(r'groupmaster', GroupMasterViewSet, basename='groupmaster')
router.register(r'typemaster', TypeMasterViewSet, basename='typemaster')
router.register(r'categorymaster', CategoryMasterViewSet, basename='categorymaster')

urlpatterns = [
    path('', include(router.urls)),
]
