from django.db import models

# Create your models here.
class TypeMaster(models.Model):
    TYPE_code = models.CharField(max_length=4, unique=True)
    TYPE_description = models.CharField(max_length=100)
    TYPE_active = models.BooleanField(default=True)
    TYPE_use_order_form = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.TYPE_code