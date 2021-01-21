import stripe
import os
import json
from django.utils.decorators import method_decorator
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, Group
from .models import Product, Purchase, PurchaseOrder, ContactUsMessage
from users.models import Profile
from django.contrib.auth import authenticate, login
from rest_framework import viewsets, authentication, permissions, renderers, views
from .serializers import (UserSerializer, GroupSerializer, ProductSerializer, 
        ProfileSerializer, PurchaseOrderReadSerializer, PurchaseOrderWriteSerializer,
        ContactUsMessageSerializer, PurchaseSerializer, ChangePasswordSerializer)

from rest_framework.fields import ImageField
from django.views.decorators.csrf import csrf_exempt


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


from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response


class ChangePasswordView(generics.UpdateAPIView):
        """
        An endpoint for changing password.
        """
        serializer_class = ChangePasswordSerializer
        model = User
        permission_classes = (permissions.IsAuthenticated,)

        def get_object(self, queryset=None):
            obj = self.request.user
            return obj

        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # Check old password
                if not self.object.check_password(serializer.data.get("old_password")):
                    return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                response = {
                    'status': 'success',
                    'code': status.HTTP_200_OK,
                    'message': 'Password updated successfully',
                    'data': []
                }

                return Response(response)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
    

class PurchaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer


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


stripe.api_key = os.environ.get('STRIPE_SK')
endpoint_secret = os.environ.get('STRIPE_ENDPOINT_SECRET')
key = 'pk_test_51I3nPqAHPQv4bwqaS2vvi7WXqZ3fSqRpokIGn2EXOr99RXKwL8FuwmQlj99UhdYV1eA3sSjNHfX8NyolJGr4gb7A00hsBy6BLx'


@method_decorator(csrf_exempt, name='dispatch')
class PaymentView(views.APIView):
    authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        data = {
            'key': key,
        }
        return JsonResponse(data)

    def post(self, request, format=None):
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
                success_url='http://localhost:3000/purchase-success',
                cancel_url='http://localhost:3000/shopping-cart',
                metadata={
                    'user_id': request.user.id,
                    'items': json.dumps(dict(enumerate(items_info))),
                    }
                )

        data = {
                'key': key,
                'id': session.id
                }

        return JsonResponse(data)


@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None

    try:
        event = stripe.Webhook.construct_event(
                    payload, sig_header, endpoint_secret
                )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)


    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # Fulfill the purchase...
        fulfill_order(session)

    # Passed signature verification
    return HttpResponse(status=200)


def fulfill_order(session):
    total_amount = session.get("amount_total")
    user_id = session.get('metadata').get('user_id')

    customer = User.objects.filter(id=user_id).first()
    order = PurchaseOrder(user=customer, status='payment confirmed', value=total_amount)
    order.save()

    items = json.loads(session.get('metadata').get('items'))

    print("#############")
    products = []
    for key in items:
        product_id = items[key][0]
        quantity = items[key][1]
        products.append((product_id, quantity))


    for each in products:
        product = Product.objects.filter(id=each[0]).first()
        purchase = Purchase(purchase_order=order, product=product, quantity=each[1])
        purchase.save()
        order.purchased_products.add(purchase)

        #order.products.add(product)

    print("@@@@@@@@@@@@@@@@@@@")
    print(session)
  #  user = User.Objects.filter(username='user1').first()
  #  order = PurchaseOrder(user=user)





