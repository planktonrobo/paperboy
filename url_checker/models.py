from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify
from newspaper import Article as A
import requests
from datetime import datetime
from date_guesser import guess_date
from tld import get_tld



SMMRY_API_KEY = '7A78724038'
API_ENDPOINT = "https://api.smmry.com"
header_params = {"Expect": "100-continue"}


def SUM_URL(url):

    params = {
        "SM_API_KEY": SMMRY_API_KEY,
        "SM_LENGTH": 7,
        "SM_WITH_BREAK": True,
        "SM_URL": url,

    }

    try:
        r = requests.post(url=API_ENDPOINT, params=params,
                          headers=header_params)
        s = r.json()
        return (s["sm_api_content"]).replace('[BREAK]', '\n'), s["sm_api_content_reduced"]
    except:
        try:
            article = A(url)
            article.download()
            article.parse()
            data = {
                "sm_api_input": article.text
                }
            params = {
                "SM_API_KEY": SMMRY_API_KEY,
                "SM_LENGTH": 7,
                "SM_WITH_BREAK": True,

            }
            r = requests.post(url=API_ENDPOINT, params=params, data=data, 
                          headers=header_params)
            s = r.json()
            return (s["sm_api_content"]).replace('[BREAK]', '\n'), s["sm_api_content_reduced"]
        except:
            return "No summary available for this article", "0%"


# Create your models here.
class Archive(models.Model):
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    publisher_name = models.CharField( max_length=100, blank=True)
    title = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    emoji = models.CharField(max_length=2, blank=True)
    slug = models.SlugField(blank=True)

    def __str__(self):
        return self.title

    class Meta:
        unique_together = ('publisher', 'title',)

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.title)
        super(Archive, self).save(*args, **kwargs)


class Article(models.Model):
    archive = models.ForeignKey(
        Archive, related_name='articles', on_delete=models.CASCADE)
    url = models.URLField(max_length=400, blank=True)
    title = models.CharField(max_length=1000, blank=True)
    thumbnail = models.URLField(max_length=200, blank=True)
    notes = models.CharField(max_length=140, blank=True)
    domain = models.CharField(max_length=50, blank=True)
    date = models.DateTimeField(default=datetime.now, blank=True)
    preview = models.BooleanField(default=False)
    def __str__(self):
        return self.title

    class Meta:
        unique_together = ('archive', 'url',)


    def save(self, *args, **kwargs):
        if not self.id:
            article = A(self.url)
            article.download()
            article.parse()
            if article.top_image:
                self.thumbnail = article.top_image
                self.preview = True
            if article.publish_date:
                self.date = article.publish_date
            else:
                guess = guess_date(url=self.url, html=article.html)
                self.date = guess.date
            if not self.title:
                self.title = article.title
                self.domain = get_tld(self.url, as_object=True).fld
        super(Article, self).save(*args, **kwargs)


class Summary(models.Model):
    url = models.URLField(max_length=400, blank=True)
    summary = models.CharField(max_length=50000, blank=True)
    reduced_by = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=1000, blank=True)
    error = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.summary, self.reduced_by = SUM_URL(self.url)
        super(Summary, self).save(*args, **kwargs)
