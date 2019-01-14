from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from leadbook.companies.models import Company
from leadbook.companies.serializers import CompanySerializer


@api_view(['GET', 'POST'])
def list_create(request):
    if request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": "Hello, world!"})

@api_view(['GET', 'PUT', 'DELETE'])
def details(request, id):
    if request.method == 'GET':
        return Response({"message": "Got some data!", "data": request.data})
    elif request.method == 'PUT':
        return Response({"message": "Got some data!", "data": request.data})
    elif request.method == 'DELETE':
        return Response({"message": "Got some data!", "data": request.data})
