from django.http import HttpRequest
from django.test import TestCase

class HomepageTestCase(TestCase):
    def test_homepage(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)

    def test_homepage_view_uses_correct_template(self):
        response = self.client.get('/')
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'index.html')

    def test_homepage_view_contains_correct_html(self):
        response = self.client.get('/')
        self.assertContains(response, '<div id="app">Loading...</div>')
