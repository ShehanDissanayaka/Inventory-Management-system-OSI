from django.shortcuts import render
# typemaster/views.py
from rest_framework import viewsets
from .models import TypeMaster
from .serializers import TypeMasterSerializer

class TypeMasterViewSet(viewsets.ModelViewSet):
    queryset = TypeMaster.objects.all()
    serializer_class = TypeMasterSerializer

