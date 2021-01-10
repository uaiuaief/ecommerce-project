from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from .models import Product, PurchaseOrder, ContactUsMessage
from users.models import Profile
from django.contrib.auth import authenticate, login

from rest_framework import viewsets, permissions, renderers
from .serializers import (UserSerializer, GroupSerializer, ProductSerializer, 
        ProfileSerializer, PurchaseOrderReadSerializer, PurchaseOrderWriteSerializer,
        ContactUsMessageSerializer)

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
    queryset = PurchaseOrder.objects.all().order_by('-date')
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


class ContactUsMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows contact us messages to be viewed or edited.
    """
    queryset = ContactUsMessage.objects.all()
    serializer_class = ContactUsMessageSerializer

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]






#TEST TEST TEST
import stripe
import os
from django.views.decorators.csrf import csrf_exempt
import json


stripe.api_key = os.environ.get('STRIPE_SK')
key = 'pk_test_51I3nPqAHPQv4bwqaS2vvi7WXqZ3fSqRpokIGn2EXOr99RXKwL8FuwmQlj99UhdYV1eA3sSjNHfX8NyolJGr4gb7A00hsBy6BLx'


@csrf_exempt
def payment_view(request):
    if(request.method == 'POST'):
        purchase_items = json.loads(request.body)

        items_info = [(item.get('id'), item.get('amount')) for item in purchase_items]

        line_items = []
        for each in items_info:
            each_id = each[0]
            each_quantity = each[1]

            item = Product.objects.filter(id=each_id).first()
            each_line_item = {
                    'currency': 'brl',
                    'name': item.name,
                    'amount': item.price,
                    #'images': [item.image],
                    'quantity': each_quantity,
            }
            line_items.append(each_line_item)


        session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=line_items,
                mode='payment',
                success_url='http://localhost:3000/success',
                cancel_url='http://localhost:3000/cancel',
        )
    
        data = {
            'key': key,
            'id': session.id
        }
      
        return JsonResponse(data)
    return JsonRespones({})






