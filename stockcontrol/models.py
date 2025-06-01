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

class Customer(models.Model):
    CUSTOMER_code = models.CharField(max_length=15, unique=True)
    CUSTOMER_group = models.IntegerField()
    CUSTOMER_area = models.IntegerField()
    CUSTOMER_name = models.CharField(max_length=150)
    CUSTOMER_title = models.CharField(max_length=20, null=True, blank=True)
    CUSTOMER_title_id = models.IntegerField(null=True, blank=True)
    CUSTOMER_address = models.CharField(max_length=400, null=True, blank=True)
    CUSTOMER_tele_1 = models.CharField(max_length=50, null=True, blank=True)
    CUSTOMER_tele_2 = models.CharField(max_length=50, null=True, blank=True)
    CUSTOMER_tele_mobile = models.CharField(max_length=50, null=True, blank=True)
    CUSTOMER_fax = models.CharField(max_length=50, null=True, blank=True)
    CUSTOMER_email = models.EmailField(max_length=100, null=True, blank=True)
    CUSTOMER_contact_person = models.CharField(max_length=150, null=True, blank=True)
    CUSTOMER_contact_person_title = models.CharField(max_length=20, null=True, blank=True)
    CUSTOMER_contact_person_title_id = models.IntegerField(null=True, blank=True)
    CUSTOMER_term = models.IntegerField()
    CUSTOMER_vat_number = models.CharField(max_length=20, null=True, blank=True)
    CUSTOMER_credit_limit = models.DecimalField(max_digits=22, decimal_places=2, null=True, blank=True)
    CUSTOMER_creidt_period = models.BigIntegerField(null=True, blank=True)
    CUSTOMER_account_number = models.IntegerField()
    CUSTOMER_lock = models.BooleanField(default=False)
    CUSTOMER_created_user_session = models.BigIntegerField(null=True, blank=True)
    CUSTOMER_created_datetime = models.DateTimeField(null=True, blank=True)
    CUSTOMER_last_edited_user_session = models.BigIntegerField(null=True, blank=True)
    CUSTOMER_last_edited_datetime = models.DateTimeField(null=True, blank=True)
    CUSTOMER_prefix_id = models.BigIntegerField()
    CUSTOMER_prefix_number = models.IntegerField()

    def __str__(self):
        return self.CUSTOMER_name

class Supplier(models.Model):
    SUPPLIER_id               = models.BigAutoField(primary_key=True)            # maps to IDENTITY(1,1)
    SUPPLIER_code             = models.CharField(max_length=15, unique=True)
    SUPPLIER_group            = models.IntegerField()
    SUPPLIER_area             = models.IntegerField()
    SUPPLIER_name             = models.CharField(max_length=150)
    SUPPLIER_title            = models.CharField(max_length=20, blank=True, null=True)
    SUPPLIER_title_id         = models.IntegerField(blank=True, null=True)
    SUPPLIER_address          = models.CharField(max_length=400)
    SUPPLIER_tele_1           = models.CharField(max_length=50, blank=True, null=True)
    SUPPLIER_tele_2           = models.CharField(max_length=50, blank=True, null=True)
    SUPPLIER_tele_mobile      = models.CharField(max_length=50, blank=True, null=True)
    SUPPLIER_fax              = models.CharField(max_length=50, blank=True, null=True)
    SUPPLIER_email            = models.EmailField(max_length=100, blank=True, null=True)
    SUPPLIER_contact_person   = models.CharField(max_length=150, blank=True, null=True)
    SUPPLIER_contact_person_title    = models.CharField(max_length=20, blank=True, null=True)
    SUPPLIER_contact_person_title_id = models.IntegerField(blank=True, null=True)
    SUPPLIER_term             = models.IntegerField()
    SUPPLIER_vat_number       = models.CharField(max_length=20, blank=True, null=True)
    SUPPLIER_credit_limit     = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    SUPPLIER_creidt_period    = models.BigIntegerField(blank=True, null=True)
    SUPPLIER_account_number   = models.IntegerField()
    SUPPLIER_lock             = models.BooleanField(default=False)
    SUPPLIER_created_user_session    = models.BigIntegerField(blank=True, null=True)
    SUPPLIER_created_datetime        = models.DateTimeField(blank=True, null=True)
    SUPPLIER_last_edited_user_session = models.BigIntegerField(blank=True, null=True)
    SUPPLIER_last_edited_datetime     = models.DateTimeField(blank=True, null=True)
    SUPPLIER_prefix_id        = models.BigIntegerField()
    SUPPLIER_prefix_number    = models.IntegerField()
    SUPPLIER_customer         = models.BigIntegerField(blank=True, null=True)
                 # don’t touch schema – it already exists

    def __str__(self):
        return self.SUPPLIER_code

# stockcontrol/models.py
class ItemMaster(models.Model):
    ITEM_id                = models.BigAutoField(primary_key=True)
    ITEM_code              = models.CharField(max_length=10, unique=True)
    ITEM_group             = models.IntegerField()
    ITEM_type              = models.IntegerField()
    ITEM_category          = models.IntegerField()
    ITEM_description       = models.CharField(max_length=600, blank=True, null=True)
    ITEM_uom               = models.IntegerField(blank=True, null=True)
    ITEM_reorder_level     = models.DecimalField(max_digits=23, decimal_places=3, blank=True, null=True)
    ITEM_reorder_qty       = models.DecimalField(max_digits=23, decimal_places=3, blank=True, null=True)
    ITEM_max_level         = models.DecimalField(max_digits=23, decimal_places=3, blank=True, null=True)
    ITEM_min_level         = models.DecimalField(max_digits=23, decimal_places=3, blank=True, null=True)
    ITEM_purchase_price    = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    ITEM_min_selling_price = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    ITEM_normal_selling_price  = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    ITEM_cash_selling_price    = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    ITEM_credit_selling_price  = models.DecimalField(max_digits=22, decimal_places=2, blank=True, null=True)
    ITEM_invoicable        = models.BooleanField(blank=True, null=True)
    ITEM_active            = models.BooleanField(blank=True, null=True)
    ITEM_warranty          = models.IntegerField(blank=True, null=True)
    ITEM_has_barcode       = models.BooleanField(blank=True, null=True)
    ITEM_barcode           = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        db_table = "INV_Item_Master"   # exact name (schema removed for SQLite)
        managed = True                 # change to False if using an existing SQL-Server table

    def __str__(self):
        return self.ITEM_code
