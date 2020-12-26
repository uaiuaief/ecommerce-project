from django.urls import include, path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
#router.register(r'groups', views.GroupViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'profile', views.ProfileViewSet, basename="profile")


urlpatterns = [
        path('', include(router.urls)),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

