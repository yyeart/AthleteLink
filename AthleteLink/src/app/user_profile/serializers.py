from rest_framework import serializers
from ..user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "telegram",
            "gender",
            "birth_date",
            "city",
            "bio",
            "created_at",
        ]
        read_only_fields = ["id", "email", "created_at"]

