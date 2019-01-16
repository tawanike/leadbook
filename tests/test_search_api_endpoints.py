import json
import urllib
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from leadbook.search.serializers import SearchSerializer

class BasicTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.api_url = 'http://localhost:8000/api/v1/search/?'
        self.auth_url = 'http://localhost:8000/api/v1/auth/token'
        self.name = 'Destiny Realty Solutions',
        self.address = '71 KAMPONG BAHRU ROAD 169373, Singapore'
        self.phone = '+65 6325 2633'
        self.logo = 'http://acmelogos.com/images/logo-1.svg'

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

class SearchTestCase(BasicTestCase):

    def test_search(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(str(self.api_url) + urllib.parse.urlencode({'company':'Destiny Realty Solutions'}))
        self.assertEqual(
            json.loads(json.dumps(response.data)).get('data')[0].get('name'),
            self.name[0]
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_by_phone_number(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(str(self.api_url) + urllib.parse.urlencode({'company':'+65 6325 2633'}))
        self.assertEqual(
            json.loads(json.dumps(response.data)).get('data')[0].get('name'),
            self.name[0]
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_non_existent_company(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(str(self.api_url) + urllib.parse.urlencode({'company':'Monopoly'}))
        self.assertIsInstance(json.loads(json.dumps(response.data)), type(None))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_search_without_keywords(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.get(str(self.api_url) + urllib.parse.urlencode({'company':''}))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
