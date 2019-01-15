import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from leadbook.search.serializers import SearchSerializer

class SearchTestCase(TestCase):
    def test_search(self):
        self.assertEqual(True, False)

    def test_search_by_phone_number(self):
        self.assertEqual(True, False)

    def test_search_non_existent_company(self):
        self.assertEqual(True, False)

    def test_search_without_keywords(self):
        self.assertEqual(True, False)
