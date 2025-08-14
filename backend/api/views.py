from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostListSerializer, PostDetailSerializer
from .pagination import CustomPageNumberPagination
from blog.models import Post


class PostListView(APIView):
    """
    API View to retrieve all published posts.
    """

    def get(self, request):
        posts = Post.objects.filter(is_published=True)
        paginator = CustomPageNumberPagination()
        paginated_posts = paginator.paginate_queryset(posts, request)
        serializer = PostListSerializer(paginated_posts, many=True)
        return paginator.get_paginated_response(serializer.data)
        # return Response(serializer.data, status=status.HTTP_200_OK)


class PostDetailView(APIView):
    """
    API View to retrieve a single published post.
    """

    def get_object(self, slug):
        return get_object_or_404(Post, slug=slug, is_published=True)
    
    def get(self, request, slug):
        post = self.get_object(slug)
        serializer = PostDetailSerializer(post, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)