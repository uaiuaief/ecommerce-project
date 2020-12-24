from django.db import models
from django.contrib.auth.models import User 
from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    full_name = models.CharField(blank=True, max_length=60)
    gender = models.CharField(blank=True, max_length=20, choices=[('Masculino','Masculino'), ('Feminino', 'Feminino')], default="Masculino")

    zip_code  = models.CharField(blank=True, max_length=9)
    address = models.CharField(blank=True, max_length=120)
    house_number = models.CharField(blank=True, max_length=20)
    district  = models.CharField(blank=True, max_length=40)
    state = models.CharField(blank=True, max_length=40)
    city = models.CharField(blank=True, max_length=40)
    complement  = models.CharField(blank=True, max_length=120)
    reference = models.CharField(blank=True, max_length=120)

    def __str__(self):
        return f'Profile: {self.user.username}'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
