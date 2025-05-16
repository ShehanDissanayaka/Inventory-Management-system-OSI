# groupmaster/serializers.py
from rest_framework import serializers
from .models import GroupMaster

class GroupMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMaster
        fields = ['id', 'GROUP_code', 'GROUP_description']  # Use exact model field names
