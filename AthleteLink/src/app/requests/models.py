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
    current_players = models.PositiveIntegerField(default=1, verbose_name='Текущее количество игроков')

    event_date = models.DateTimeField("Дата и время события", 
                                      default=get_default_event_date)
    location = models.CharField("Место проведения", max_length=255, default='Москва')
    description = models.TextField("Описание", max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    STATUS_CHOICES = [
        ('planned', 'Запланировано'),
        ('active', 'Активно'),
        ('completed', 'Завершено'),
        ('cancelled', 'Отменено'),
    ]

    RESULT_CHOICES = [
        ('na', 'Н/Д'),
        ('cancelled', 'Отменена'),
        ('victory', 'Победа'),
        ('defeat', 'Поражение'),
    ]

    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='planned')
    game_result = models.CharField('Результат', max_length=20, choices=RESULT_CHOICES, default='na')


    class Meta:
        db_table = 'requests'
        ordering = ['-event_date']
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self):
        return f"{self.title} - {self.sport}"