from django.shortcuts import render
from django.http import HttpResponse
from .models import Category, FurnitureItem


def get_index_page(request):
    return render(request, 'face/index.html', {
        'categories': Category.objects.all(),
        'items': FurnitureItem.objects.all(),
    })
