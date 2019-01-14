from django.conf.urls import url, include

urlpatterns = [
    url(r'^users/', include('leadbook.users.urls')),
    url(r'^search/', include('leadbook.search.urls')),
    url(r'^companies/', include('leadbook.companies.urls')),
    url(r'^favourites/', include('leadbook.favourites.urls')),
]
