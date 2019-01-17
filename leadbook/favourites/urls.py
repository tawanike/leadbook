from django.conf.urls import url

from leadbook.favourites import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    url('(?P<id>[\w-]+)', views.details),
    url('', views.create),
]
