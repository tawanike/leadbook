from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic import TemplateView

from django.views.decorators.csrf import csrf_exempt
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from leadbook.companies import views as companies_views
from leadbook.favourites import views as favourites_views
from leadbook.search import views as search_views


urlpatterns = [
    url('api/v1/auth/', csrf_exempt(obtain_jwt_token)),
    url('api/v1/auth/refresh/', refresh_jwt_token),
    url('api/v1/auth/verify/', verify_jwt_token),
    url('api/v1/', include('leadbook.api.v1.urls')),
    path('admin/', admin.site.urls),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
