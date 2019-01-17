import jwt
from django.conf import settings
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User

class UserAuthenticationTestCase(TestCase):
    """ UserAuthenticationTestCase test obtaining, refreshing and verifying token."""
    def setUp(self):
        self.email = 'johndoe@example.com'
        self.username = 'johndoe'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)

        self.api_url = 'http://localhost:8000/api/v1/auth/'
        self.client = APIClient()
        self.token = ''
        self.auth_url = 'http://localhost:8000/api/v1/auth/token/'
        self.client = APIClient()
        self.data = {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'email': 'janedoe@example.com',
            'username': 'janedoe',
            'password': 'ytrewq'
        }
        self.invalid_data = {
            'username': '',
            'password': self.password,
            'email': self.email
        }

        self.token = self.client.post(self.auth_url, {
            'username': self.username,
            'password': self.password
        }, format='json')

    def test_auth_attempt_user_login_with_inactive_account(self):
        response = self.client.post(self.api_url + 'token', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # TODO Check for the actual code and text message from the api
        # self.assertEqual(response.data, 'Unable to log in with provided credentials.')

    def test_auth_user_login(self):
        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        response = self.client.post(self.auth_url, {
        'username': self.username, 'password': self.password }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_auth_refresh_user_token(self):
        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        token = self.client.post(self.auth_url, {
            'username': self.username, 'password': self.password }, format='json')

        response = self.client.post(self.api_url + 'refresh/', { "token": token.data.get('token'),
            "username": self.username,
	        "password": self.password }, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('token'), token.data.get('token'))

    def test_auth_verify_bad_user_token(self):
        resp = self.client.post(self.api_url + 'verify', {'token': 'qwerty',"username": self.username,
	"password": self.password }, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


    def test_auth_bad_credentials(self):
        response = self.client.post(self.auth_url, {
            'username': 'johndoe',
            'password': 'passsword'
        }, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_auth_user_information_on_token(self):
        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        token = self.client.post(self.auth_url, {
            'username': self.username, 'password': self.password }, format='json')

        decoded = jwt.decode(token.data.get('token'), settings.SECRET_KEY, algorithms=['HS256'])
        self.assertEqual(decoded.get('username'), self.username)
