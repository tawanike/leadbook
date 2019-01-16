import json
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
        data = []
        nextPage = 1
        previousPage = 1

        page = request.GET.get('page', 1)

        companies = Company.objects.all().order_by('created_at')
        paginator = Paginator(companies, 10)

        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CompanySerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': json.loads(json.dumps(serializer.data)), 'count': paginator.count,
        'numpages' : paginator.num_pages, 'nextlink': '/api/v1/search/?page=' + str(nextPage),
        'prevlink': '/api/v1/search/?page=' + str(previousPage)})

@api_view(['GET', 'PUT', 'DELETE'])
def details(request, id):
    try:
        company = Company.objects.get(pk=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CompanySerializer(company, context={'request': request})
        return Response(serializer.data)
    elif request.method == 'PUT':

        serializer = CompanySerializer(company, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
