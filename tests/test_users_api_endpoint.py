import json
from rest_framework import status
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from leadbook.users.models import UserProfile
from leadbook.users.serializers import UserSerializer, UserProfileSerializer

class BaseTestCase(TestCase):

    def setUp(self):
        self.first_name = 'John'
        self.email = 'johndoe@example.com'
        self.username = 'johndoe'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.profile = UserProfile.objects.get(user__username=self.username)
        self.api_url = 'http://localhost:8000/api/v1/users/'
        self.client = APIClient()
        self.data = {
            'username': self.username,
            'password': self.password,
            'email': self.email
        }
        self.invalid_data = {
            'username': '',
            'password': self.password,
            'email': self.email
        }

class UserTestCase(BaseTestCase):
    def test_users_check_username_availability(self):
        response = self.client.get(self.api_url + 'availability/?username=' + self.username)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('is_available'), False)

    def test_users_check_email_availability(self):
        response = self.client.get(self.api_url + 'availability/?email=' + self.email)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('is_available'), False)

    def test_users_check_username_availability_invalid_url(self):
        response = self.client.get(self.api_url + 'availability/username=' + self.username)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_check_email_availability_invalid_url(self):
        response = self.client.get(self.api_url + 'availability/email=' + self.email)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_create_user(self):
        response = self.client.post(self.api_url, self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_create_user_invalid_credentials(self):
        response = self.client.post(self.api_url, self.invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_users_profile_was_created_with_new_user(self):
        profile = UserProfile.objects.get(user__username=self.username)
        self.assertEqual(profile.user.username, self.username)

    def test_users_get_user_profile(self):
        response = self.client.get(self.api_url + '1', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), self.username)

    def test_users_account_in_active_on_creation(self):
        user = User.objects.get(username=self.username)
        self.assertEqual(user.is_active, False)

    def test_users_send_activation_email(self):
        self.assertEqual(True, False)

    def test_users_account_activation(self):
        response = self.client.post(self.api_url + '1', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('username'), self.username)

    def test_users_change_password(self):
        self.assertEqual(True, False)

    def test_users_update_profile(self):
        """ Update user's first_name """
        response = self.client.put(self.api_url + '1',
                                    { 'first_name': self.first_name }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        resp = self.client.get(self.api_url + '1', self.data, format='json')
        
        """ Check if API returns an updated user's first_name  """
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data.get('first_name'), self.first_name)

    def test_users_delete_profile(self):
        response = self.client.delete(self.api_url + '1')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data.get('username'), None)
