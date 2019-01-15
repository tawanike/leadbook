from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from leadbook.users.serializers import UserProfileSerializer, UserSerializer
from leadbook.users.models import UserProfile


@api_view(['GET'])
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


@api_view(['GET'])
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
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def details(request, id):
    if request.method == 'GET':
        return Response({"message": "Got some data!", "data": request.data})
    elif request.method == 'PUT':
        return Response({"message": "Got some data!", "data": request.data})
    elif request.method == 'DELETE':
        return Response({"message": "Got some data!", "data": request.data})
