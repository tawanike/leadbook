from django.conf.urls import url

from leadbook.users import views

urlpatterns = [
    url('availability', views.check_availability, name="check_availability"),
    url('activate/(?P<code>[\w-]+)', views.activate, name="account_activate"),
    url('(?P<id>[0-9]+)$', views.details, name="get_user_profile"),
    url('reset-password', views.reset_password, name="reset_password"),
    url('create-password/(?P<code>[\w-]+)', views.create_password, name="create_password"),
    url('', views.create, name="create_user"),
]
