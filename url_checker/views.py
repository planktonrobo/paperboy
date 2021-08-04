from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import logging
import urllib.request
import os
from rest_framework import viewsets, permissions
from .serializers import ArchiveSerializer, ArticleSerializer, SummarySerializer
from .models import Archive, Article, Summary




    
class FrontendAppView(View):
   def get(self, request):
        print (os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

class ArchiveView(viewsets.ModelViewSet):
    serializer_class = ArchiveSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def get_queryset(self):
        return self.request.user.archive_set.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(publisher=self.request.user, publisher_name=self.request.user.username)
    

class ArticleView(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
    queryset = Article.objects.all()


class SummaryView(viewsets.ModelViewSet):
    serializer_class = SummarySerializer
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = Summary.objects.all()

class ArchiveSharingView(viewsets.ReadOnlyModelViewSet):
    serializer_class = ArchiveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = Archive.objects.all()
    