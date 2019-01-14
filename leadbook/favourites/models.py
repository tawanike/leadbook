from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

from leadbook.companies.models import Company

class Favourite(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
