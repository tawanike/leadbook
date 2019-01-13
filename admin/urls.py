from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.views.generic import TemplateView
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from rest_framework import routers

from leadbook.profiles.views import ProfileViewSet
from leadbook.companies.views import CompanyViewSet
from leadbook.favourites.views import FavouriteViewSet
from leadbook.search import views

router = routers.DefaultRouter()

router.register(r'users', ProfileViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'favourites', FavouriteViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    url('api/v1/', include(router.urls)),
    url('api/v1/auth/refresh/', refresh_jwt_token),
    url('api/v1/auth/', obtain_jwt_token),
    url('api/v1/auth/verify/', verify_jwt_token),
    url('api/v1/search/', views.search),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]
