from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404 
from news.models import News
from news.serializers import NewsSerializer

class NewsCreateView(generics.GenericAPIView):
    serializer_class = NewsSerializer

    def post(self, request, *args, **kwargs):
        serializer = NewsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class NewsListView(generics.GenericAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all().order_by('-created_at')

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = NewsSerializer(queryset, many=True)
        serialized_data = serializer.data
        return Response({"news": serialized_data})

class NewsUpdateView(generics.GenericAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()

    def get_object(self, pk):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=pk)
        return obj

    def put(self, request, *args, **kwargs):
        news_instance = self.get_object(pk=kwargs["id"])
        serializer = NewsSerializer(news_instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"news": serializer.data})

class NewsDetailView(generics.GenericAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()

    def get_object(self, pk):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=pk)
        return obj

    def get(self, request, *args, **kwargs):
        news_instance = self.get_object(pk=kwargs["id"])
        serializer = NewsSerializer(news_instance)
        return Response({"news": serializer.data})

class NewsDeleteView(generics.GenericAPIView):
    serializer_class = NewsSerializer
    queryset = News.objects.all()

    def get_object(self, pk):
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, pk=pk)
        return obj

    def delete(self, request, *args, **kwargs):
        news_instance = self.get_object(pk=kwargs["id"])
        news_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)