from django.db import models

# Create your models here.
class News(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Notíicia'
        verbose_name_plural = 'Notícias'

    def __str__(self):
        return self.name