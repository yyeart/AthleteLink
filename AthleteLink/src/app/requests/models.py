from django.db import models
from django.conf import settings

class ActivityRequest(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='created_requests'
    )
    
    # НОВОЕ ПОЛЕ
    title = models.CharField("Название игры", max_length=100)
    
    sport = models.CharField("Вид спорта", max_length=100)
    players_count = models.PositiveIntegerField("Количество игроков")
    event_date = models.DateTimeField("Дата и время события")
    location = models.CharField("Место проведения", max_length=255)
    description = models.TextField("Описание", max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'

    def __str__(self):
        return f"{self.title} - {self.sport}"