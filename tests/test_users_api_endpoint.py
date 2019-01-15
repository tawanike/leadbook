import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from leadbook.users.models import UserProfile
from leadbook.users.serializers import UserSerializer, UserProfileSerializer

class BaseTestCase(TestCase):

    def setUp(self):
        self.email = 'johndoe@example.com'
        self.username = 'johndoe'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)

        self.data = {
            'username': self.username,
            'password': self.password
        }

class UserTestCase(BaseTestCase):
    def test_users_check_username_availability(self):
        self.assertEqual(True, False)

    def test_users_check_email_availability(self):
        self.assertEqual(True, False)

    def test_users_create_user(self):
        self.assertEqual(True, False)

    def test_users_profile_was_created_with_new_user(self):
        self.assertEqual(True, False)

    def test_users_send_activation_email(self):
        self.assertEqual(True, False)

    def test_users_account_activation(self):
        self.assertEqual(True, False)

    def test_users_change_password(self):
        self.assertEqual(True, False)

    def test_users_update_profile(self):
        self.assertEqual(True, False)

    def test_users_delete_profile(self):
        self.assertEqual(True, False)
