from django.shortcuts import render
from django.http import HttpResponse


def get_index_page(request):
    return render(request, 'face/index.html')
