from django.contrib.auth.models import User, Group
from .models import Product, PurchaseOrder, ContactUsMessage, Purchase
from users.models import Profile 
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(read_only=True)
    profile = serializers.HyperlinkedRelatedField(read_only=True, view_name='profile-detail')

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'profile', 'purchases']
        #fields = "__all__"


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    #user = UserSerializer(read_only=True)
    user = serializers.HyperlinkedRelatedField(read_only=True, view_name='user-detail')

    class Meta:
        model = Profile
        fields = "__all__"
        #exclude = ["user"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


class PurchaseSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    product = ProductSerializer()

    class Meta:
        model = Purchase
        fields = "__all__"


class PurchaseOrderWriteSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = "__all__"


class PurchaseOrderReadSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)
    #products = ProductSerializer(many=True)
    purchased_products = PurchaseSerializer(many=True)

    class Meta:
        model = PurchaseOrder
        fields = "__all__"
        #fields = ['id', 'user', 'status', 'value', 'purchased_products', 'date']
    

class ContactUsMessageSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = ContactUsMessage
        fields = "__all__"
 
    
class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        print('@@@@@@@@@@@@@@@@@@', value)
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return value


