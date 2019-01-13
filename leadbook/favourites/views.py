from leadbook.favourites.models import Favourite
from rest_framework import viewsets
from leadbook.favourites.serializers import FavouriteSerializer


class FavouriteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer
