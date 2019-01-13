from leadbook.profiles.models import Profile
from rest_framework import serializers


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'activation_code', 'created_at', 'updated_at')
