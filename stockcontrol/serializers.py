# stockcontrol/serializers.py

from rest_framework import serializers
from .models import GroupMaster, TypeMaster, CategoryMaster, ItemLocationMaster, Customer, Supplier, ItemMaster

class GroupMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMaster
        fields = ['id', 'GROUP_code', 'GROUP_description']

class TypeMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeMaster
        fields = ['id', 'TYPE_code', 'TYPE_description', 'TYPE_active', 'TYPE_use_order_form']

class CategoryMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryMaster
        fields = ['id', 'CATEGORY_code', 'CATEGORY_description', 'CATEGORY_active']

class ItemLocationMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemLocationMaster
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):          # ② NEW
    class Meta:
        model  = Supplier
        fields = '__all__'

class ItemMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ItemMaster
        fields = "__all__"
