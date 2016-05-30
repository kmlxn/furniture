from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    tech_name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class FurnitureItem(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField()
    category = models.ForeignKey(Category)

    def __str__(self):
        return self.name
