from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from apps.blog.models import PostModel
from .serializers import PostSerializer


class BlogView(APIView):
    def get(self, request, version='v1', format='json'):
        data = PostSerializer(PostModel.objects.all().order_by('-id'), many=True).data
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, version='v1', format='json'):
        serialized = PostSerializer(data=request.data)
        errors = None
        if serialized.is_valid():
            serialized.save()
            return self.get(request)
        else:
            errors = serialized.errors            
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
