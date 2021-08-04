from rest_framework import serializers
from .models import Archive, Article, Summary
from rest_framework import validators

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('__all__')
        
class SummarySerializer(serializers.ModelSerializer):
    def run_validators(self, value):
        for validator in self.validators:
            if isinstance(validator, validators.UniqueTogetherValidator):
                self.validators.remove(validator)
        super(SummarySerializer, self).run_validators(value)

    def create(self, validated_data):
        instance, _ = Summary.objects.get_or_create(**validated_data)
        return instance

    class Meta:
        model = Summary
        fields = ('__all__')

class ArchiveSerializer(serializers.ModelSerializer):
    articles = ArticleSerializer(many=True, required=False)
    class Meta:
        model = Archive
        fields = ('id','emoji', 'title','publisher', 'publisher_name', 'created_at', 'slug', 'articles')