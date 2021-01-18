from django.contrib import admin
from .models import Product, Purchase, PurchaseOrder, ContactUsMessage

# Register your models here.

admin.site.register(Product)
admin.site.register(PurchaseOrder)
admin.site.register(Purchase)
admin.site.register(ContactUsMessage)
