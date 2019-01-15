from django.conf.urls import url

from leadbook.companies import views

urlpatterns = [
    url('(?P<id>[0-9]+)$', views.details, name='get_company'),
    url('', views.list_create, name='all_companies'),
]
