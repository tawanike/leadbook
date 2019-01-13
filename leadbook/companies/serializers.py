from leadbook.companies.models import Company
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('pk', 'name', 'address', 'phone', 'created_at', 'updated_at')
