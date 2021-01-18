from django.urls import include, path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
#router.register(r'groups', views.GroupViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'purchase_orders', views.PurchaseOrderViewSet)
router.register(r'purchases', views.PurchaseViewSet)
router.register(r'profile', views.ProfileViewSet, basename="profile")
router.register(r'send_message', views.ContactUsMessageViewSet)


urlpatterns = [
        path('', include(router.urls)),
        path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

