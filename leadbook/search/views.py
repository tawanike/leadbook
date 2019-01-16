import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from leadbook.companies.models import Company
from leadbook.companies.serializers import CompanySerializer

@api_view(['GET'])
def search(request):
    """
        Search companies by name
    """
    if request.method == 'GET':
        if(len(request.GET.get('company')) == 0):
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        data = []
        nextPage = 1
        previousPage = 1

        page = request.GET.get('page', 1)

        try:
            companies = Company.objects.filter(name__contains=request.GET.get('company')).order_by('name')
            if (len(companies) == 0):
                try:
                    companies = Company.objects.filter(phone=request.GET.get('company')).order_by('name')
                    if (len(companies) == 0):
                        return Response(status=status.HTTP_404_NOT_FOUND)

                except Company.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)

        except Company.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


        paginator = Paginator(companies, 10)

        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = CompanySerializer(data,context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': json.loads(json.dumps(serializer.data)),
        'count': paginator.count,
        'numpages' : paginator.num_pages, 'nextlink': '/api/v1/search/?page=' + str(nextPage),
        'prevlink': '/api/v1/search/?page=' + str(previousPage)})
