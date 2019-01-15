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

    def test_pagination_is_ten(self):
        self.assertEqual(True, False)
        # response = self.client.get(reverse('search'))
        # self.assertEqual(response.status_code, 200)
        # self.assertTrue('is_paginated' in response.context)
        # self.assertTrue(response.context['is_paginated'] == True)
        # self.assertTrue(len(response.context['author_list']) == 10)
