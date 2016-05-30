from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    tech_name = models.CharField(max_length=255)


class FurnitureItem(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField()
    category = models.ForeignKey(Category)
