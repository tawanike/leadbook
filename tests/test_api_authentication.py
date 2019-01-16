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
        self.data = {
            'username': self.username,
            'password': self.password
        }

    def get_token(self):
        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        response = self.client.post(self.api_url + 'token', self.data, format='json')
        return response.data

    def test_auth_attempt_user_login_with_inactive_account(self):
        response = self.client.post(self.api_url + 'token', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # TODO Check for the actual code and text message from the api
        # self.assertEqual(response.data, 'Unable to log in with provided credentials.')

    def test_auth_user_login(self):
        user = User.objects.get(username=self.username)
        user.is_active = True
        user.save()

        response = self.client.post(self.api_url + 'token', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)

    def test_auth_refresh_user_token(self):
        self.assertEqual(True, False)

    def test_auth_verify_user_token(self):
        token = self.get_token()
        response = self.client.post(self.api_url + 'verify',
                                { 'token': token.get('token') }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('token'), token.get('token'))

    def test_auth_verify_bad_user_token(self):
        resp = self.client.post(self.api_url + 'verify', {'token': 'qwerty' }, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


    def test_auth_bad_credentials(self):
        response = self.client.post(self.api_url + 'token', {
            'username': 'johndoe',
            'password': 'passsword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('token' in response.data)
        self.token = response.data.get('token')

    def test_auth_refresh_expired_token(self):
        self.assertEqual(True, False)

    def test_auth_user_information_on_token(self):
        self.assertEqual(True, False)
