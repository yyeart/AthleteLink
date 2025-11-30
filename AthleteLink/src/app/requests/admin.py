from django.contrib import admin
from .models import Sport

@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display = ('name', 'min_required_players', 'max_required_players')
