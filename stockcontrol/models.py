# stockcontrol/models.py

from django.db import models

class GroupMaster(models.Model):
    GROUP_code = models.CharField(max_length=10, unique=True)
    GROUP_description = models.TextField()

    def __str__(self):
        return self.GROUP_code

class TypeMaster(models.Model):
    TYPE_code = models.CharField(max_length=4, unique=True)
    TYPE_description = models.CharField(max_length=100)
    TYPE_active = models.BooleanField(default=True)
    TYPE_use_order_form = models.BooleanField(default=False, null=True)

    def __str__(self):
        return self.TYPE_code

class CategoryMaster(models.Model):
    CATEGORY_code = models.CharField(max_length=4, unique=True)
    CATEGORY_description = models.CharField(max_length=100)
    CATEGORY_active = models.BooleanField(default=True)

    def __str__(self):
        return self.CATEGORY_description

class ItemLocationMaster(models.Model):
    LOC_code = models.CharField(max_length=5, null=True, blank=True)
    LOC_description = models.CharField(max_length=200, null=True, blank=True)
    LOC_address = models.CharField(max_length=300, null=True, blank=True)
    LOC_active = models.BooleanField(default=True)
    LOC_have_maintenance = models.BooleanField(default=False)
    LOC_last_invoice_number = models.BigIntegerField(default=0)
    LOC_invoice_prefix = models.CharField(max_length=1)
    LOC_has_invoice = models.BooleanField(default=False)
    LOC_last_cash_in_hand_number = models.BigIntegerField(default=0)

    def __str__(self):
        return f"{self.LOC_code} - {self.LOC_description}"