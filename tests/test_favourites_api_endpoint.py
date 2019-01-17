import jwt
import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from leadbook.favourites.models import Favourite
from leadbook.favourites.serializers import FavouriteSerializer

class BaseTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.api_url = 'http://localhost:8000/api/v1/favourites/'
        self.auth_url = 'http://localhost:8000/api/v1/auth/token'
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

class CompanyFollowTestCase(BaseTestCase):
    def test_follow_company(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'));
        response = self.client.post(self.api_url, { 'company': 1, 'user': 1}, format='json');
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_follow_unfollow_company(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        self.assertEqual(True, False)

    def test_follow_following_already_followed_company(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        response = self.client.post(self.api_url, { 'company': 1, 'user': 1}, format='json');
        # If the user already follows a company, the server will send back a status code of 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_follow_unfollowing_already_unfollowed_company(self):
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + self.token.data.get('token'))
        self.assertEqual(True, False)
