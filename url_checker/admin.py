from django.contrib import admin

# Register your models here.
from .models import Archive, Article

class ArticleInLine(admin.TabularInline):
    model = Article
class ArchiveAdmin(admin.ModelAdmin):
    fieldsets=[(None, {'fields':['title']}), (None, {'fields':['publisher']}),]
    inlines = [ArticleInLine]

admin.site.register(Archive, ArchiveAdmin)