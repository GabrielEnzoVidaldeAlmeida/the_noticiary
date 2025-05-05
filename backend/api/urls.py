from django.contrib import admin
from django.urls import path
from news import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/news/', views.NewsListView.as_view(), name="news"),
    path('api/news/<int:id>/', views.NewsDetailView.as_view(), name="news_detail"),
    path('api/news/create/', views.NewsCreateView.as_view(), name="news_create"),
    path('api/news/update/<int:id>/', views.NewsUpdateView.as_view(), name="news_update"),
    path('api/news/delete/<int:id>/', views.NewsDeleteView.as_view(), name="news_delete")
]
