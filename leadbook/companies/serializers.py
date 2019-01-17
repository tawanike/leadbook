from leadbook.companies.models import Company
from rest_framework import serializers


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = (
            'id', 'name', 'address_line_one',  'address_line_one',  'address_line_two',
             'address_line_three', 'building',  'city',  'province',  'postcode',
             'phone', 'created_at', 'updated_at', 'logo',

        )
