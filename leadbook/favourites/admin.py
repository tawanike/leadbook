from django.contrib import admin
from leadbook.favourites.models import Favourite

class FavouriteAdmin(admin.ModelAdmin):
    pass

admin.site.register(Favourite, FavouriteAdmin)
