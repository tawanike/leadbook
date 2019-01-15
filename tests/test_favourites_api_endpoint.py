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
        self.email = 'johndoe@example.com'
        self.username = 'johndoe'
        self.password = 'password'
        self.user = User.objects.create_user(
            self.username, self.email, self.password)

        self.data = {
            'username': self.username,
            'password': self.password
        }

class CompanyFollowTestCase(BaseTestCase):
    def test_follow_company(self):
        self.assertEqual(True, False)

    def test_follow_check_if_user_already_follows_company(self):
        self.assertEqual(True, False)

    def test_follow_unfollow_company(self):
        self.assertEqual(True, False)

    def test_follow_following_already_followed_company(self):
        self.assertEqual(True, False)

    def test_follow_unfollowing_already_unfollowed_company(self):
        self.assertEqual(True, False)