# stockcontrol/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupMasterViewSet, TypeMasterViewSet, CategoryMasterViewSet, ItemLocationMasterViewSet, CustomerViewSet, SupplierViewSet, ItemMasterViewSet

router = DefaultRouter()
router.register(r'groupmaster', GroupMasterViewSet, basename='groupmaster')
router.register(r'typemaster', TypeMasterViewSet, basename='typemaster')
router.register(r'categorymaster', CategoryMasterViewSet, basename='categorymaster')
router.register(r'itemlocationmaster', ItemLocationMasterViewSet, basename='itemlocationmaster')
router.register(r'customermaster', CustomerViewSet, basename='customermaster')
router.register(r'suppliers', SupplierViewSet, basename='suppliers')
router.register(r'items', ItemMasterViewSet, basename='items')

urlpatterns = [
    path('', include(router.urls)),    # ONLY the router here
]
