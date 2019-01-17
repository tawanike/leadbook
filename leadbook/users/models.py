import uuid
import hashlib
from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import pre_save, post_save
from django.template.loader import render_to_string, get_template

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    activation_code = models.CharField(max_length=255)

    def __str__(self):
        return "%s" % self.user.username

def deactivate_user(sender, instance, **kwargs):
    # Check if instance is creating a new user and only set is_active to False
    # when creating a new user
    if instance._state.adding is True:
        instance.is_active = False

def create_user_profile(sender, instance, created, **kwargs):

    activation_code = hashlib.sha224(uuid.uuid4().hex.encode('utf-8')).hexdigest()

    if created:
       profile, created = UserProfile.objects.get_or_create(user=instance, activation_code=activation_code)


pre_save.connect(deactivate_user, sender=User)
post_save.connect(create_user_profile, sender=User)
