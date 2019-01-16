import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from leadbook.companies.models import Company
from leadbook.companies.serializers import CompanySerializer

class BasicTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.api_url = 'http://localhost:8000/api/v1/companies/'
        self.auth_url = 'http://localhost:8000/api/v1/auth/token'

        self.name = 'Destiny Realty Solutions',
        self.address = '71 KAMPONG BAHRU ROAD 169373, Singapore'
        self.phone = '+65 6325 2633'
        self.logo = 'http://acmelogos.com/images/logo-1.svg'
        self.data = {
            'address': self.address,
            'phone': self.phone,
            'logo': self.logo
        }
        self.email = 'johndoe@example.com'
        self.username = 'johndoe'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)

        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        self.token = self.client.post(self.auth_url, {
            'username': self.username,
            'password': self.password
        }, format='json')

class CompanyTestCase(BasicTestCase):
    """ Test module for GET all companies API """
    def test_companies_get_all_companies(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(self.api_url)
        # self.maxDiff = None
        companies = Company.objects.all().order_by('created_at')
        serializer = CompanySerializer(companies, many=True)

        self.assertEqual(response.data.get('data'), json.loads(json.dumps(serializer.data)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_get_company_by_id(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(self.api_url + '1')

        company = Company.objects.get(pk=1)
        serializer = CompanySerializer(company)

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_update_company_details(self):
        company = Company.objects.get(pk=1)
        company.phone = '0731946286'

        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.put(self.api_url + '1', {
        	"name": "Destiny Realty Solutions",
        	"address": "71 KAMPONG BAHRU ROAD 169373, Singapore",
        	"logo": "http://acmelogos.com/images/logo-1.svg",
        	"phone": "0731946286"

        })
        self.assertEqual(response.data.get('phone'), '0731946286')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_delete_company(self):
        company = Company.objects.create(
            name=self.name,
            address=self.address,
            phone=self.phone,
            logo=self.logo
        )
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.delete(self.api_url + '11')
        # companies = Company.objects.all()
        # serializer = CompanySerializer(companies, many=True)
        # self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_companies_create_company_without_all_information(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.post(self.api_url, self.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
