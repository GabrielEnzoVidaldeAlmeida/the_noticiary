from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

from news.models import News
from news.serializers import NewsSerializer
# Create your views here.

class NewsDetailView(generics.GenericAPIView):
    serializer_class = NewsSerializer

    def get(self, request, *args, **kwargs):
        news_instance = News.objects.first()
        news = NewsSerializer(news_instance).data
        print ("news_instante: ", news["name"])
        return Response({
            "teste": "Olá mundo!"
        })