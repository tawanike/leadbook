from leadbook.companies.models import Company
from rest_framework import viewsets
from leadbook.companies.serializers import CompanySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Company.objects.all().order_by('-created_at')
    serializer_class = CompanySerializer
