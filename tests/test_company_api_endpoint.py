import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from leadbook.companies.models import Company
from leadbook.companies.serializers import CompanySerializer

# Initialize the api client
user = User.objects.get(username='codebender')
client = APIClient()
client.force_authenticate(user=user)
# client.credentials(HTTP_AUTHORIZATION='JWT ' + token.key)

class GetAllCompaniesTestCase(TestCase):
    """ Test module for GET all companies API """
    def setUp(self):
        Company.objects.create(
            name='Destiny Realty Solutions',
            address='71 KAMPONG BAHRU ROAD 169373, Singapore',
            phone='+65 6325 2633',
            logo='http://acmelogos.com/images/logo-1.svg'
        )
        Company.objects.create(
            name='Seleville Business Solutions',
            address='84 Duchhesses Avenue',
            phone='0731946286',
            logo='path/to/logo'
        )

    def test_companies_get_all_companies(self):
        response = client.get(reverse('all_companies'))
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_get_company_by_id(self):
        response = client.get(reverse('get_company', kwargs={ 'id':1 }))
        company = Company.objects.get(pk=1)
        serializer = CompanySerializer(company)
        self.assertEqual(response.data.get('data'), serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_create_new_company(self):
        response = client.get(reverse('all_companies'))
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_update_company_details(self):
        response = client.get(reverse('get_company', kwargs={ 'id':1 }))
        company = Company.objects.get(pk=1)
        serializer = CompanySerializer(company)
        self.assertEqual(response.data.get('data'), serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_delete_company(self):
        response = client.get(reverse('all_companies'))
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_companies_create_company_without_all_information(self):
        response = client.get(reverse('get_company', kwargs={ 'id':1 }))
        company = Company.objects.get(pk=1)
        serializer = CompanySerializer(company)
        self.assertEqual(response.data.get('data'), serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CompanyTestCase(TestCase):
    def setUp(self):
        Company.objects.create(name="Mmogo Media", address="123 Edgemoor Road", phone="0731946286", logo="path/to/file")

    def test_company_was_created(self):
        """ Test to see if the company object is being created properly """
        company = Company.objects.get(name="Mmogo Media")
        self.assertEqual(company.name, 'Mmogo Media')
        self.assertEqual(company.address, '123 Edgemoor Road')
        self.assertEqual(company.phone, '0731946286')
        self.assertEqual(company.logo, 'path/to/file')

    def test_company_was_updated(self):
        company = Company.objects.get(name="Mmogo Media")
        company.address = '123 Edgemoor Road, Hatfield'
        company.save()

        self.assertEqual(company.address, '123 Edgemoor Road, Hatfield')
