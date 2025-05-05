from django.contrib import admin
from django.urls import path
from news import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/news/', views.NewsListView.as_view(), name="news"),
    path('api/news/<int:id>/', views.NewsDetailView.as_view(), name="news_detail"),
    path('api/news/create/', views.NewsCreateView.as_view(), name="news_create"),
    path('api/news/update/<int:id>/', views.NewsUpdateView.as_view(), name="news_update"),
    path('api/news/delete/<int:id>/', views.NewsDeleteView.as_view(), name="news_delete")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)