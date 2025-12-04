from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from ..requests.models import Sport, ActivityRequest

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email обязателен')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    full_name = models.CharField(max_length=100, verbose_name='Имя')
    username = models.CharField(max_length=50, unique=True, verbose_name='Никнейм')
    telegram = models.CharField(max_length=100, verbose_name='Telegram')
    
    GENDER_CHOICES = [
        ('male', 'Мужской'),
        ('female', 'Женский'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True, verbose_name='Пол')
    
    birth_date = models.DateField(verbose_name='Дата рождения')
    city = models.CharField(max_length=100, verbose_name='Город')
    email = models.EmailField(unique=True, verbose_name='Email')
    bio = models.TextField(blank=True, null=True, verbose_name='Биография')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    total_wins = models.PositiveIntegerField('Всего побед', default=0)
    total_losses = models.PositiveIntegerField('Всего поражений', default=0)
    global_rating = models.IntegerField('Общий рейтинг', default=0)

    prestige_level = models.PositiveSmallIntegerField(default=0)
    global_rank = models.PositiveIntegerField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'telegram', 'birth_date', 'city']
    
    objects = UserManager()
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return f"{self.username} ({self.email})"
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser
    
class UserSportStats(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sport_stats')
    sport = models.ForeignKey('requests.Sport', on_delete=models.CASCADE, related_name='user_stats')

    wins = models.PositiveIntegerField('Побед', default=0)
    losses = models.PositiveIntegerField('Поражений', default=0)
    rating = models.IntegerField('Рейтинг в спорте', default=0)

    win_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)

    sport_rank_name = models.CharField(max_length=50, default='Искра I')

    class Meta:
        unique_together = ('user', 'sport')
        verbose_name = 'Статистика по спорту'
        verbose_name_plural = 'Статистика по спорту'

class EventParticipant(models.Model):
    STATUS_CHOICES = [
        ('registered', 'Зарегистрирован'),
        ('confirmed', 'Подтвержден'),
        ('cancelled', 'Отменил'),
        ('attended', 'Присутствовал'),
    ]
    
    event = models.ForeignKey(ActivityRequest, on_delete=models.CASCADE, verbose_name='Событие')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='registered', verbose_name='Статус')
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        null=True,
        blank=True,
        verbose_name='Оценка'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        db_table = 'event_participants'
        verbose_name = 'Участник события'
        verbose_name_plural = 'Участники событий'
        unique_together = ['event', 'user']