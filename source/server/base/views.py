import os

from django.conf import settings
from django.http import Http404, HttpResponse
from django.shortcuts import redirect
from django.views.generic import View


class IndexView(View):
    """Render main page."""
    
    def get(self, request):
        if '/api/' in request.path:
            raise Http404()
        """
        Return html for main application page.
        Load bundled index.html because of hashed file name of javascript and stylesheets.
        """
        abspath = open(os.path.join(settings.PRJECT_ROOT, 'client/build/index.html'), 'r')
        return HttpResponse(content=abspath.read())
