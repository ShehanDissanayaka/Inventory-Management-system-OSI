# groupmaster/views.py
from rest_framework import viewsets
from .models import GroupMaster
from .serializers import GroupMasterSerializer

class GroupMasterViewSet(viewsets.ModelViewSet):
    queryset = GroupMaster.objects.all()
    serializer_class = GroupMasterSerializer
