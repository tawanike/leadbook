from django.conf.urls import url

from leadbook.favourites import views

urlpatterns = [
    url('(?P<id>[0-9]+)$', views.details),
    url('', views.list_create),
]
