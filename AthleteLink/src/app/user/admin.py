from django.contrib import admin
from .models import User, Sport, UserRating, Event, EventParticipant
from datetime import date

@admin.register(Sport)
class SportAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    list_per_page = 20
    
    def created_at(self, obj):
        return "Базовая модель"
    created_at.short_description = 'Тип'

@admin.register(UserRating)
class UserRatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'sport', 'rating', 'ratings_count', 'get_rating_stars')
    list_filter = ('sport', 'rating')
    search_fields = ('user__nickname', 'user__email', 'sport__name')
    list_editable = ('rating',)
    list_per_page = 25
    
    def get_rating_stars(self, obj):
        return "★" * int(obj.rating) + "☆" * (5 - int(obj.rating))
    get_rating_stars.short_description = 'Рейтинг'

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('sport', 'organizer', 'event_date', 'status', 
                   'required_players', 'current_players', 'players_progress')
    list_filter = ('sport', 'status', 'event_date', 'created_at')
    search_fields = ('sport__name', 'organizer__nickname', 'organizer__email', 'address')
    readonly_fields = ('created_at', 'current_players')
    date_hierarchy = 'event_date'
    list_per_page = 30
    
    def players_progress(self, obj):
        if obj.required_players > 0:
            percentage = (obj.current_players / obj.required_players) * 100
            return f"{obj.current_players}/{obj.required_players} ({percentage:.0f}%)"
        return "0%"
    players_progress.short_description = 'Заполненность'

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
    list_display = ('email', 'nickname', 'first_name', 'city', 
                   'get_age', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'city', 'gender', 'created_at')
    search_fields = ('email', 'nickname', 'first_name', 'last_name', 'telegram')
    readonly_fields = ('created_at', 'last_login')
    ordering = ('-created_at',)
    list_per_page = 50
    
    fieldsets = (
        ('Учетные данные', {
            'fields': ('email', 'password')
        }),
        ('Основная информация', {
            'fields': ('first_name', 'last_name', 'nickname', 'telegram')
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