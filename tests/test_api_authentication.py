from django.test import TestCase
from django.contrib.auth.models import User

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

class UserAuthenticationTestCase(BaseTestCase):
    """ JWTTokenOperationsTeasCase test obtaining, refreshing and verifying token."""
    def test_auth_user_login(self):
        self.assertEqual(True, False)

    def test_auth_refresh_user_token(self):
        self.assertEqual(True, False)

    def test_auth_verify_user_token(self):
        self.assertEqual(True, False)

    def test_auth_bad_credentials(self):
        self.assertEqual(True, False)

    def test_auth_refresh_expired_token(self):
        self.assertEqual(True, False)

    def test_auth_user_information_on_token(self):
        self.assertEqual(True, False)
