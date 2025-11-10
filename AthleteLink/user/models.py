from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, username, telegram, password=None, **extra_fields):
        if not email:
            raise ValueError('У пользователя должен быть адрес электронной почты')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, telegram=telegram, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, telegram, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, telegram, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = [
       ("М", "Мужчина"),
       ("Ж", "Женщина")
    ]
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=30, unique=True)
    telegram = models.CharField(max_length=50)

    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    birth_date = models.DateField(blank=True, null=True)  # было: birth_date = models.DateField()
    location = models.CharField(max_length=100, blank=True)  # было: location = models.CharField(max_length=100)
    
    #Предпочтения
    preferred_gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    preferred_age_min = models.PositiveIntegerField(default=15)
    preferred_age_max = models.PositiveIntegerField(default=25)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'telegram']

    def __str__(self):
        return self.username