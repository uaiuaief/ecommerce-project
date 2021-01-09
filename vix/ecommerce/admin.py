from django.contrib import admin
from .models import Product, PurchaseOrder, ContactUsMessage

# Register your models here.

admin.site.register(Product)
admin.site.register(PurchaseOrder)
admin.site.register(ContactUsMessage)
