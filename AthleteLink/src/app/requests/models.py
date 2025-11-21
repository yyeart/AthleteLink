from django.db import models
from django.conf import settings

class ActivityRequest(models.Model):
    STATUS_CHOICES = [
        ('approved', 'Одобрена'),
        ('rejected', 'Отклонена'),
        ('completed', 'Завершена'),
        ('pending', 'На рассмотрении'),
    ]

    RESULT_CHOICES = [
        ('na', 'Н/Д'),
        ('cancelled', 'Отменена'),
        ('victory', 'Победа'),
        ('defeat', 'Поражение'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='activity_request')

    event_name = models.CharField('Название события', max_length=255)
    date = models.DateTimeField('Дата и время')
    sport = models.CharField('Вид спорта', max_length=100)

    status = models.CharField('Статус', max_length=20, choices=STATUS_CHOICES, default='pending')
    game_result = models.CharField('Результат игры', max_length=20, choices=RESULT_CHOICES, default='na')
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
    
    def __str__(self):
        return f'{self.event_name} ({self.user})'