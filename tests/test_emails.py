import json
from django.core import mail
from rest_framework import status
from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string, get_template

from rest_framework.test import APIClient


class ActivationEmailTestCase(TestCase):
    def setUp(self):
        self.subject = 'Subject here'
        self.to = 'to@example.com'
        self.sender = 'from@example.com'
        self.first_name = 'John'
        self.activation_url = 'https://localhost:8000/accounts/activate/eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJ1c2VyX2lkIjozLCJleHAiOjE1NDc3Mzc4MDJ9'
        self.activation_code = 'eyJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJ1c2VyX2lkIjozLCJleHAiOjE1NDc3Mzc4MDJ9'
        self.context = {
            'first_name': self.first_name,
            'activation_code': self.activation_code
        }

        self.text_content = render_to_string('emails/activation.txt', self.context)
        self.html_content = get_template('emails/activation.html').render(self.context)
        self.msg = EmailMultiAlternatives(self.subject, self.text_content, self.sender, [self.to])
        self.msg.attach_alternative(self.html_content, "text/html")
        self.msg.send()

    def test_email_contains_the_correct_subject(self):
        self.assertEqual(self.msg.subject, self.subject)

    def test_email_contains_activation_url(self):
        if self.activation_code in self.text_content:
            self.assertTrue(True)
        else:
            self.assertTrue(False)

    def test_email_contains_user_first_name(self):
        if self.first_name in self.text_content:
            self.assertTrue(True)
        else:
            self.assertTrue(False)
