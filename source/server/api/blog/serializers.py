from apps.blog.models import PostModel
from rest_framework import serializers


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PostModel
        fields = ('title', 'text', 'created_date')
