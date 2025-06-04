from django.urls import path
from . import views


app_name = 'api'
urlpatterns = [
    # posts
    path('posts/', views.PostListView.as_view(), name='post-list'),
    path('posts/<slug:slug>/', views.PostDetailView.as_view(), name='post-detail'),
]