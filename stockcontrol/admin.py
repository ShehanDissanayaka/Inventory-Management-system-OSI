from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import GroupMaster, TypeMaster, CategoryMaster, ItemLocationMaster, Customer, Supplier, ItemMaster

admin.site.register(GroupMaster)
admin.site.register(TypeMaster)
admin.site.register(CategoryMaster)
admin.site.register(ItemLocationMaster)
admin.site.register(Customer)
admin.site.register(Supplier)
admin.site.register(ItemMaster)
