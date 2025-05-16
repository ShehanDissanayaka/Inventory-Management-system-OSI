# typemaster/serializers.py
from rest_framework import serializers
from .models import TypeMaster

class TypeMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeMaster
        fields = ['id', 'TYPE_code', 'TYPE_description', 'TYPE_active', 'TYPE_use_order_form']
