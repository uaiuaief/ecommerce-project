from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login 
from rest_framework import status


@csrf_exempt
def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password =  request.POST.get("password")
        
        username_already_exists = User.objects.filter(username=username).first()
        email_already_exists = User.objects.filter(email=email).first()

        if username_already_exists:
            body = {
                'content': 'An user with that username already exists',
            }
            return JsonResponse(body, status=status.HTTP_403_FORBIDDEN)
        elif email_already_exists:
            body = {
                'content': 'An user with that email already exists',
            }
            return JsonResponse(body, status=status.HTTP_403_FORBIDDEN)


        user = User(username=username, email=email, password=password)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        data = {
            "name": request.POST.get("name"),
            "email": request.POST.get("email"),
            "password": request.POST.get("password")
        }
    else:
        data = {"req_method": "GET"}
    return JsonResponse(data)
 

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email
        })   

    

    

    
