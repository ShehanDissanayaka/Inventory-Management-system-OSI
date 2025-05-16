# stockcontrol/views.py

from rest_framework import viewsets
from .models import GroupMaster, TypeMaster, CategoryMaster
from .serializers import GroupMasterSerializer, TypeMasterSerializer, CategoryMasterSerializer 

class GroupMasterViewSet(viewsets.ModelViewSet):
    queryset = GroupMaster.objects.all()
    serializer_class = GroupMasterSerializer

class TypeMasterViewSet(viewsets.ModelViewSet):  # <-- This is the TypeMasterViewSet
    queryset = TypeMaster.objects.all()
    serializer_class = TypeMasterSerializer

class CategoryMasterViewSet(viewsets.ModelViewSet):
    queryset = CategoryMaster.objects.all()
    serializer_class = CategoryMasterSerializer