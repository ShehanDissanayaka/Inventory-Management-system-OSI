from rest_framework import viewsets, generics, filters
from .models import GroupMaster, TypeMaster, CategoryMaster, ItemLocationMaster, Customer, Supplier, ItemMaster
from .serializers import GroupMasterSerializer, TypeMasterSerializer, CategoryMasterSerializer, ItemLocationMasterSerializer, CustomerSerializer, SupplierSerializer, ItemMasterSerializer

class GroupMasterViewSet(viewsets.ModelViewSet):
    queryset = GroupMaster.objects.all()
    serializer_class = GroupMasterSerializer

class TypeMasterViewSet(viewsets.ModelViewSet):
    queryset = TypeMaster.objects.all()
    serializer_class = TypeMasterSerializer

class CategoryMasterViewSet(viewsets.ModelViewSet):
    queryset = CategoryMaster.objects.all()
    serializer_class = CategoryMasterSerializer

class ItemLocationMasterViewSet(viewsets.ModelViewSet):
    queryset = ItemLocationMaster.objects.all()
    serializer_class = ItemLocationMasterSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class SupplierViewSet(viewsets.ModelViewSet):                        # ③ NEW
    queryset         = Supplier.objects.all()
    serializer_class = SupplierSerializer
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['SUPPLIER_code', 'SUPPLIER_name']

class ItemMasterViewSet(viewsets.ModelViewSet):
    queryset = ItemMaster.objects.all()
    serializer_class = ItemMasterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields   = ["ITEM_code", "ITEM_description"]
