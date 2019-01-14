from django.conf.urls import url

from leadbook.users import views

urlpatterns = [
    url('availability', views.check_availability),
    url('activate/(?P<code>[\w-]+)', views.activate),
    url('(?P<id>[0-9]+)$', views.details),
    url('', views.list_create),
]
