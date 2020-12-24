from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from .models import Product
from users.models import Profile
from django.contrib.auth import authenticate, login

from rest_framework import viewsets, permissions, renderers
from .serializers import UserSerializer, GroupSerializer, ProductSerializer, ProfileSerializer

from rest_framework.fields import ImageField


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user profiles to be viewed or edited.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    #permission_classes = [permissions.AllowAny]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    image = ImageField(write_only=True)
    

