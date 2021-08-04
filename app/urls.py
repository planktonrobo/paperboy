"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from django.conf.urls import url
from url_checker.views import FrontendAppView, ArchiveView, ArticleView, SummaryView, ArchiveSharingView
from accounts.api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'archives', ArchiveView, 'archives')
router.register(r'archive', ArchiveSharingView, 'archive')
router.register(r'articles', ArticleView, 'articles')
router.register(r'summaries', SummaryView, 'summaries')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    url(r'^', FrontendAppView.as_view()),

]

