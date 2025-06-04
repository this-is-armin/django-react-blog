from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import PostSerializer
from blog.models import Post


class PostListView(APIView):
    """
    API View to retrieve all published posts.
    """

    def get(self, request):
        posts = Post.objects.filter(is_published=True)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostDetailView(APIView):
    """
    API View to retrieve a single published post.
    """

    def get_object(self, slug):
        return get_object_or_404(Post, slug=slug, is_published=True)
    
    def get(self, request, slug):
        post = self.get_object(slug)
        serializer = PostSerializer(post, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)