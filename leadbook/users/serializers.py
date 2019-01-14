from django.contrib.auth.models import User
from rest_framework import serializers
from . import models

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('user', 'activation_code')

    def create(self, validated_data):
        return models.UserProfile(**validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'is_active']

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
