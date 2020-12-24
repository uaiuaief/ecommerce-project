from django.contrib.auth.models import User, Group
from .models import Product
from users.models import Profile 
from rest_framework import serializers
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(read_only=True)
    profile = serializers.HyperlinkedRelatedField(read_only=True, view_name='profile-detail')

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'profile']
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
