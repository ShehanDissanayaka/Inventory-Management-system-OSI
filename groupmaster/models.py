# groupmaster/models.py
from django.db import models

class GroupMaster(models.Model):
    GROUP_code = models.CharField(max_length=10, unique=True)
    GROUP_description = models.TextField()

    def __str__(self):
        return self.GROUP_code
