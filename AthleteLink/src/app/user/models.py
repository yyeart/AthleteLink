from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator

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
    first_name = models.CharField(max_length=100, verbose_name='Имя')
    last_name = models.CharField(max_length=100, blank=True, null=True, verbose_name='Фамилия')
    nickname = models.CharField(max_length=50, unique=True, verbose_name='Никнейм')
    telegram = models.CharField(max_length=100, verbose_name='Telegram')
    
    GENDER_CHOICES = [
        ('male', 'Мужской'),
        ('female', 'Женский'),
        ('other', 'Другое'),
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
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'first_name', 'telegram', 'birth_date', 'city']
    
    objects = UserManager()
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return f"{self.nickname} ({self.email})"
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser

class Sport(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название спорта')
    
    class Meta:
        db_table = 'sports'
        verbose_name = 'Вид спорта'
        verbose_name_plural = 'Виды спорта'
    
    def __str__(self):
        return self.name

class UserRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, verbose_name='Вид спорта')
    rating = models.DecimalField(
        max_digits=3, 
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
        verbose_name='Рейтинг'
    )
    ratings_count = models.IntegerField(default=0, verbose_name='Количество оценок')
    
    class Meta:
        db_table = 'user_ratings'
        verbose_name = 'Рейтинг пользователя'
        verbose_name_plural = 'Рейтинги пользователей'
        unique_together = ['user', 'sport']

class Event(models.Model):
    STATUS_CHOICES = [
        ('planned', 'Запланировано'),
        ('active', 'Активно'),
        ('completed', 'Завершено'),
        ('cancelled', 'Отменено'),
    ]
    
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE, verbose_name='Вид спорта')
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Организатор')
    required_players = models.IntegerField(verbose_name='Требуется игроков')
    current_players = models.IntegerField(default=0, verbose_name='Текущее количество игроков')
    
    # Временное поле для координат - просто текст
    location = models.TextField(null=True, blank=True, verbose_name='Координаты')
    
    address = models.TextField(verbose_name='Адрес')
    event_date = models.DateTimeField(verbose_name='Дата события')
    description = models.TextField(blank=True, null=True, verbose_name='Описание')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planned', verbose_name='Статус')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    
    class Meta:
        db_table = 'events'
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

class EventParticipant(models.Model):
    STATUS_CHOICES = [
        ('registered', 'Зарегистрирован'),
        ('confirmed', 'Подтвержден'),
        ('cancelled', 'Отменил'),
        ('attended', 'Присутствовал'),
    ]
    
    event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name='Событие')
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