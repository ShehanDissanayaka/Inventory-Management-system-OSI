# typemaster/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TypeMasterViewSet

router = DefaultRouter()
router.register(r'typemaster', TypeMasterViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
