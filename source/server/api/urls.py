from django.conf.urls import url, include
from .blog.views import BlogView


urlpatterns = [
    url(r'^blog/$', BlogView.as_view()),
]
