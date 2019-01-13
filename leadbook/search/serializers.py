from leadbook.companies.models import Company
from rest_framework import serializers


class SearchSerializer(serializers.HyperlinkedModelSerializer):
    print('SEARCH')
    class Meta:
        model = Company
        fields = ('user', 'company', 'created_at', 'updated_at')
