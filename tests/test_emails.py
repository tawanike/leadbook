import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient


class ActivationEmailTestCase(TestCase):
    def test_email_uses_the_correct_template(self):
        self.assertEqual(True, False)

    def test_email_contains_the_correct_text(self):
        self.assertEqual(True, False)

    def test_email_contains_activation_code(self):
        self.assertEqual(True, False)

    def test_email_contains_user_first_name(self):
        self.assertEqual(True, False)

    def test_email_uses_correct_activation_url(self):
        self.assertEqual(True, False)

class PasswordResetEmailTestCase(TestCase):
    def test_email_uses_the_correct_template(self):
        self.assertEqual(True, False)

    def test_email_contains_the_correct_text(self):
        self.assertEqual(True, False)

    def test_email_contains_password_rest_code(self):
        self.assertEqual(True, False)

    def test_email_contains_user_first_name(self):
        self.assertEqual(True, False)

    def test_email_uses_correct_password_reset_url(self):
        self.assertEqual(True, False)
