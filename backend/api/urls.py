from django.contrib import admin
from django.urls import path
from news import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/news/', views.NewsDetailView.as_view(), name="news")
]
