from leadbook.favourites.models import Favourite
from rest_framework import serializers


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ('id', 'user', 'company', 'created_at', 'updated_at')
        depth = 1
