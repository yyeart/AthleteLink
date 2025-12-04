from datetime import timedelta
from django.db import models
from django.conf import settings
from django.utils import timezone

def get_default_event_date():
    return timezone.now() + timedelta(days=1)

class Sport(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название спорта')
    min_required_players = models.PositiveIntegerField('Минимальное кол-во игроков', default=2)
    max_required_players = models.PositiveIntegerField('Максимальное кол-во игроков', default=20)
    # hint

    class Meta:
        db_table = 'sports'
        verbose_name = 'Вид спорта'
        verbose_name_plural = 'Виды спорта'

    def __str__(self):
        return self.name

class ActivityRequest(models.Model):
    request_creator = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        verbose_name='Создать заявки',
        related_name='created_requests',
    )

    title = models.CharField("Название события", max_length=100)
    
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, verbose_name='Вид спорта')

    players_count = models.PositiveIntegerField("Количество игроков")

    event_date = models.DateTimeField("Дата и время события", 
                                      default=get_default_event_date)
    
    location = models.CharField("Место проведения", max_length=255, default='Москва')
    latitude = models.DecimalField(
        max_digits=12, decimal_places=7,
        null=True, blank=True, verbose_name='Широта'
    )
    longitude = models.DecimalField(
        max_digits=12, decimal_places=7,
        null=True, blank=True, verbose_name='Долгота'
    )

    description = models.TextField("Описание", max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='joined_requests',
        verbose_name='Участники',
        blank=True
    )

    winners = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='won_requests',
        verbose_name='Победители',
        blank=True
    )

    game_result_text = models.CharField('Результат (текст)', max_length=255, blank=True, null=True)

    STATUS_CHOICES = [
        ('planned', 'Запланировано'),
        ('active', 'Активно'),
        ('completed', 'Завершено'),
        ('cancelled', 'Отменено'),
    ]

    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='planned')

    class Meta:
        db_table = 'requests'
        ordering = ['-event_date']
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self):
        return f"{self.title} - {self.sport}"