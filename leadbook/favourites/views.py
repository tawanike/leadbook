import json
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from leadbook.favourites.models import Favourite
from leadbook.favourites.serializers import FavouriteSerializer

@api_view(['POST'])
def create(request):
    if request.method == 'POST':
        try:
            print(request.body.decode("utf-8"))
            body = json.loads(request.body.decode("utf-8"))
            # Check if the user already follows the company before following
            follow = Favourite.objects.filter(company=body.get('company'), user=body.get('user')).get()

            return Response(status=status.HTTP_200_OK)
        except Favourite.DoesNotExist:
            # DoesNotExist exception is triggered follow the company
            serializer = FavouriteSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
def details(request, id):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1

        page = request.GET.get('page', 1)
        try:
            favourites = Favourite.objects.filter(user=id)
        except Favourite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        paginator = Paginator(favourites, 10)

        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = FavouriteSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({
            'data': json.loads(json.dumps(serializer.data)),
            'count': paginator.count,
            'numpages' : paginator.num_pages,
            'nextlink': '/api/v1/search/?page=' + str(nextPage),
            'prevlink': '/api/v1/search/?page=' + str(previousPage)
        });
    elif request.method == 'DELETE':
        ids = id.split('-');

        try:
            favourites = Favourite.objects.filter(company=ids[0], user=ids[1]).get();
            favourites.delete();
            return Response(status=status.HTTP_200_OK);
        except Favourite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
