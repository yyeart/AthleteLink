from django import forms
from .models import User

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label='Пароль')
    confirm_password = forms.CharField(widget=forms.PasswordInput, label='Подтверждение пароля')

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'username',
            'telegram',
            'gender',
            'birth_date',
            'location',
            'preferred_gender',
            'preferred_age_min',
            'preferred_age_max',
            'email',
            'password',
            'confirm_password'
        ]

        def clean(self):
            cleaned_data = super().clean()
            password = cleaned_data.get('password')
            confirm_password = cleaned_data.get('confirm_password')

            if password and confirm_password and password != confirm_password:
                self.add_error('confirm_password', "Пароли не совпадают")

            return cleaned_data

class UserLoginForm(forms.Form):
    email = forms.CharField(
        label='Адрес электронной почты/Имя пользователя',
        max_length=50,
        required=True,
        widget=forms.TextInput(
            attrs={'placeholder': 'mai@mai.education'}
        )
    )

    password = forms.CharField(
        label='Пароль',
        required=True,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': '********'
            }
        )
    )