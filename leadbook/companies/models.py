from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20)
    logo = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
