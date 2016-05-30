from django.contrib import admin
from .models import Category, FurnitureItem


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,
            {'fields':
                ['name', 'tech_name']
            }
        )
    ]
    list_display = ('name',)


@admin.register(FurnitureItem)
class FurnitureItemAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,
            {'fields':
                ['name', 'image', 'category']
            }
        )
    ]
    list_display = ('name', 'category')
