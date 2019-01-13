from leadbook.favourites.models import Favourite
from rest_framework import serializers


class FavouriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Favourite
        fields = ('user', 'company', 'created_at', 'updated_at')
