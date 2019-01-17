import json
import uuid
import hashlib
from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import pre_save, post_save
from django.template.loader import render_to_string, get_template
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from leadbook.users.serializers import UserProfileSerializer, UserSerializer
from leadbook.users.models import UserProfile


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def check_availability(request):
    if request.GET.get('username'):
        try:
            user = User.objects.get(username=request.GET.get('username'))
            return Response({ 'is_available': False }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({ 'is_available': True }, status=status.HTTP_200_OK)


    elif request.GET.get('email'):
        try:
            user = User.objects.get(email=request.GET.get('email'))
            return Response({ 'is_available': False }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({ 'is_available': True }, status=status.HTTP_200_OK)
    else:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def activate(request, code):
     try:
        profile = UserProfile.objects.get(activation_code=code)

        if not profile.user.is_active:
            profile.user.is_active = True
            profile.user.save()
            data = 'Activated'
        else:
            profile.user.is_active = False
            profile.activation_code = ''
            profile.user.save()
            data = 'Account already activated.'

        serializer = UserProfileSerializer(profile, context={'request': request})
        return Response({ 'message': data }, status=status.HTTP_200_OK)
     except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def create(request):
    body = json.loads(request.body.decode('utf-8'))
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        profile = UserProfile.objects.get(user__email=body.get('email'))
        # Send activation email only if the instance is being created
        subject = 'Activation Email'
        context = {
            'first_name': profile.user.first_name,
            'activation_code': profile.activation_code
        }

        text_content = render_to_string('emails/activation.txt', context)
        html_content = get_template('emails/activation.html').render(context)
        msg = EmailMultiAlternatives(subject, text_content, 'postman@maillist.company', [profile.user.email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def details(request, id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def reset_password(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
        user = User.objects.get(email=body.get('email'))
        activation_code = hashlib.sha224(uuid.uuid4().hex.encode('utf-8')).hexdigest()
        user.activation_code = activation_code
        user.save()

        # Send activation email only if the instance is being created
        subject = 'Reset Password'
        context = {
            'first_name': user.first_name,
            'activation_code': activation_code
        }

        text_content = render_to_string('emails/password.txt', context)
        html_content = get_template('emails/password.html').render(context)
        msg = EmailMultiAlternatives(subject, text_content,
                                    'postman@maillist.company', [user.email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

        return Response(status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes(())
@permission_classes(())
def create_password(request, code):
    try:
        body = json.loads(request.body.decode('utf-8'))
        profile = UserProfile.objects.get(activation_code=code)
        profile.activation_code = ''


        profile.user.set_password(body.get('password'))
        profile.user.save()
        profile.save()

        return Response(status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
