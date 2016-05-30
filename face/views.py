from django.shortcuts import render
from django.http import HttpResponse
from .models import Category


def get_index_page(request):
    return render(request, 'face/index.html', {
        'categories': Category.objects.all(),
    })
