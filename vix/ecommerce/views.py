from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from .models import Product, PurchaseOrder
from users.models import Profile
from django.contrib.auth import authenticate, login

from rest_framework import viewsets, permissions, renderers
from .serializers import (UserSerializer, GroupSerializer, 
        ProductSerializer, ProfileSerializer, 
        PurchaseOrderReadSerializer, PurchaseOrderWriteSerializer)

from rest_framework.fields import ImageField


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        #print(self.request.user.password)
        if self.request.user.is_superuser:
            return User.objects.all().order_by('-date_joined')
        else:
            return User.objects.filter(id=self.request.user.id)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'update', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]



class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user profiles to be viewed or edited.
    """
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return Profile.objects.all()
        else:
            return Profile.objects.filter(user=self.request.user.id)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'update', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


#class GroupViewSet(viewsets.ModelViewSet):
#    """
#    API endpoint that allows groups to be viewed or edited.
#    """
#    queryset = Group.objects.all()
#    serializer_class = GroupSerializer
#    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows products to be viewed or edited.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    #permission_classes = [permissions.AllowAny]
    #image = ImageField(write_only=True)
    

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows purchase orders to be viewed or edited.
    """
    queryset = PurchaseOrder.objects.all()
#    serializer_class = PurchaseOrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return PurchaseOrder.objects.all().order_by('-date')

        else:
            return PurchaseOrder.objects.filter(user=self.request.user.id).order_by('-date')

    def get_serializer_class(self):
        if self.action in ['create']:
            return PurchaseOrderWriteSerializer
        else:
            return PurchaseOrderReadSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """

        user_id = self.request.user.id
        user_parameter_url = self.request.POST.get('user')
        logged_user_url = f"http://localhost:8000/users/{user_id}/"
        is_same_user = user_parameter_url == logged_user_url
         
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['create'] and is_same_user:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]







