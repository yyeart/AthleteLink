from django.contrib import admin
from .models import User, EventParticipant
from ..requests.models import Sport, ActivityRequest
from datetime import date

@admin.register(EventParticipant)
class EventParticipantAdmin(admin.ModelAdmin):
    list_display = ('event', 'user', 'status', 'rating', 'created_at', 'is_rated')
    list_filter = ('status', 'created_at', 'event__sport')
    search_fields = ('event__sport__name', 'user__nickname', 'user__email')
    list_editable = ('status', 'rating')
    readonly_fields = ('created_at',)
    list_per_page = 50
    
    def is_rated(self, obj):
        return "✅" if obj.rating else "❌"
    is_rated.short_description = 'Оценка'

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'full_name', 'city', 
                   'get_age', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'city', 'gender', 'created_at')
    search_fields = ('email', 'username', 'full_name', 'telegram')
    readonly_fields = ('created_at', 'last_login')
    ordering = ('-created_at',)
    list_per_page = 50
    
    fieldsets = (
        ('Учетные данные', {
            'fields': ('email', 'password')
        }),
        ('Основная информация', {
            'fields': ('full_name', 'username', 'telegram')
        }),
        ('Личная информация', {
            'fields': ('gender', 'birth_date', 'city', 'bio')
        }),
        ('Статусы и права', {
            'fields': ('is_active', 'is_staff', 'is_superuser')
        }),
        ('Системная информация', {
            'fields': ('last_login', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_age(self, obj):
        if obj.birth_date:
            today = date.today()
            return today.year - obj.birth_date.year - ((today.month, today.day) < (obj.birth_date.month, obj.birth_date.day))
        return "Не указан"
    get_age.short_description = 'Возраст'