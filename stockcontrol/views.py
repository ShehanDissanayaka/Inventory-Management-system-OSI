# stockcontrol/views.py

from rest_framework import viewsets
from .models import GroupMaster, TypeMaster, CategoryMaster, ItemLocationMaster
from .serializers import GroupMasterSerializer, TypeMasterSerializer, CategoryMasterSerializer, ItemLocationMasterSerializer

class GroupMasterViewSet(viewsets.ModelViewSet):
    queryset = GroupMaster.objects.all()
    serializer_class = GroupMasterSerializer

class TypeMasterViewSet(viewsets.ModelViewSet):  # <-- This is the TypeMasterViewSet
    queryset = TypeMaster.objects.all()
    serializer_class = TypeMasterSerializer

class CategoryMasterViewSet(viewsets.ModelViewSet):
    queryset = CategoryMaster.objects.all()
    serializer_class = CategoryMasterSerializer

class ItemLocationMasterViewSet(viewsets.ModelViewSet):
    queryset = ItemLocationMaster.objects.all()
    serializer_class = ItemLocationMasterSerializer