from rest_framework import serializers

from ..rank_service import calculate_prestige_data, get_sport_rank
from ..user.models import User, UserSportStats
from ..requests.models import ActivityRequest
from django.contrib.auth import get_user_model

user = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    secret_question = serializers.CharField(required=False, allow_blank=True)
    secret_answer = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "full_name",
            "telegram",
            "gender",
            "birth_date",
            "city",
            "bio",
            "created_at",
            "secret_question",
            "secret_answer"
        ]
        read_only_fields = ["id", "email", "created_at"]

    def update(self, instance, validated_data):
        question = validated_data.pop("secret_question", None)
        answer = validated_data.pop("secret_answer", None)

        if question is not None:
            instance.secret_question = question

        if answer:
            instance.set_secret_answer(answer)

        return super().update(instance, validated_data)

class RecentGameSerializer(serializers.ModelSerializer):
    sport_name = serializers.CharField(source='sport.name')
    date = serializers.DateTimeField(source='event_date', format="%d.%m.%Y")
    time = serializers.DateTimeField(source='event_date', format="%H:%M")
    
    personal_result = serializers.SerializerMethodField()

    class Meta:
        model = ActivityRequest
        fields = (
            'id',
            'title',
            'sport_name',
            'date',
            'time',
            'personal_result',
        )

    def get_personal_result(self, obj):
        user = self.context.get('request').user

        if obj.status != 'completed':
            return "Active"

        if obj.winners.filter(id=user.id).exists():
            return "Win"
        if obj.participants.filter(id=user.id).exists():
            return "Loss"
            
        return "-"
    
class BestSportSerializer(serializers.ModelSerializer):
    sport_name = serializers.CharField(source='sport.name')
    # sport_icon = serializers.ImageField(source='sport.icon', read_only=True)
    wins = serializers.IntegerField()
    losses = serializers.IntegerField()
    win_rate = serializers.SerializerMethodField()

    rank_info = serializers.SerializerMethodField()
    position_in_sport = serializers.SerializerMethodField()

    class Meta:
        model = UserSportStats
        fields = (
            'sport_name',
            # 'sport_icon', 
            'rating',
            'wins',
            'losses',
            'win_rate',   
            'rank_info',   
            'position_in_sport',
        )

    def get_win_rate(self, obj):
        total_wins = obj.wins
        total_losses = obj.losses
        total_games = total_wins + total_losses

        if total_games == 0:
            return 0.0
        
        win_rate = (total_wins / total_games) * 100

        return round(win_rate, 2)

    def get_rank_info(self, obj):
        return get_sport_rank(obj.rating)

    def get_position_in_sport(self, obj):
        higher_rank_count = UserSportStats.objects.filter(
            sport=obj.sport,
            rating__gt=obj.rating
        ).count()
        return higher_rank_count + 1

class UserFullStatsSerializer(serializers.ModelSerializer):
    prestige_info = serializers.SerializerMethodField()
    best_sport_card = serializers.SerializerMethodField()
    recent_games = serializers.SerializerMethodField()

    formatted_name = serializers.SerializerMethodField()

    global_rank_position = serializers.SerializerMethodField()
    # best_sport_icon_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'username',
            'full_name',
            'global_rating',
            'prestige_info',
            'global_rank_position',
            'best_sport_card',
            # 'best_sport_icon_url',
            'recent_games',
            'formatted_name'
        )

    def get_formatted_name(self, obj):
        parts = obj.full_name.split()
        first_name = parts[0] if parts else ""
        last_name = parts[1] if len(parts) > 1 else ""

        if last_name:
            return f'{first_name} ({obj.username}) {last_name}'
        return f'{first_name} ({obj.username})'

    def get_prestige_info(self, obj):
        return calculate_prestige_data(obj.global_rating)

    def get_global_rank_position(self, obj):
        count_higher = User.objects.filter(global_rating__gt=obj.global_rating).count()
        return count_higher + 1

    def get_best_sport_card(self, obj):
        best_stat = obj.sport_stats.order_by('-rating').first()
        if best_stat:
            return BestSportSerializer(best_stat).data
        return None

    # def get_best_sport_icon_url(self, obj):
    #     best_stat = obj.sport_stats.order_by('-rating').first()
    #     if best_stat and hasattr(best_stat.sport, 'icon') and best_stat.sport.icon:
    #         return best_stat.sport.icon.url
    #     return None

    def get_recent_games(self, obj):
        games = ActivityRequest.objects.filter(
            participants=obj,
            status__in=['completed', 'active']
        ).order_by('-event_date')[:3]
        
        return RecentGameSerializer(games, many=True, context=self.context).data

