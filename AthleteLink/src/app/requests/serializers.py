from django.utils import timezone
from rest_framework import serializers
from .models import ActivityRequest, Sport
from datetime import datetime

class RequestListSerializer(serializers.ModelSerializer):
    eventName = serializers.CharField(source='title')
    sport = serializers.CharField(source='sport.name')
    date = serializers.DateTimeField(source='event_date', format="%d.%m.%Y, %H:%M")

    playersCount = serializers.IntegerField(source='players_count')
    currentPlayers = serializers.IntegerField(source='current_players')

    applicationStatus = serializers.CharField(source='get_status_display')
    gameResult = serializers.CharField(source='get_game_result_display')

    resultColor = serializers.SerializerMethodField()


    class Meta:
        model = ActivityRequest
        fields = [
            'id',
            'eventName',
            'date',
            'sport',
            'playersCount',
            'currentPlayers',
            'applicationStatus',
            'gameResult',
            'resultColor'
        ]
    
    def get_resultColor(self, obj):
        result = obj.game_result
        if result == 'victory':
            return 'green'
        elif result == 'defeat':
            return 'red'
        elif result == 'cancelled':
            return 'black'
        return 'gray'

class RequestCreateSerializer(serializers.ModelSerializer):
    numberOfPlayers = serializers.IntegerField(source='players_count')
    date = serializers.CharField(write_only=True) 
    time = serializers.CharField(write_only=True)

    class Meta:
        model = ActivityRequest
        fields = [
            'id', 
            'title', 
            'sport', 
            'numberOfPlayers', 
            'date', 
            'time', 
            'location', 
            'description'
        ]
        read_only_fields = ['id']

    def validate(self, data):
        date_str = data.get('date')
        time_str = data.get('time')

        if date_str and time_str:
            try:
                full_datetime_str = f"{date_str} {time_str}"
                event_datetime = datetime.strptime(full_datetime_str, "%d.%m.%Y %H:%M")
                event_datetime_aware = timezone.make_aware(event_datetime)
                data['event_date'] = event_datetime_aware
                del data['date']
                del data['time']
            except ValueError:
                raise serializers.ValidationError("Неверный формат даты или времени")
        sport_id = data.get('sport')
        players_count = data.get('players_count')

        if sport_id and players_count is not None:
            try:
                sport = Sport.objects.get(pk=sport_id.id if isinstance(sport_id, Sport) else sport_id)
            except Sport.DoesNotExist:
                raise serializers.ValidationError({"sport": "Выбранный вид спорта не существует."})

            min_p = sport.min_required_players
            max_p = sport.max_required_players

            if players_count < min_p:
                raise serializers.ValidationError({
                    "numberOfPlayers": f"Минимальное количество игроков для {sport.name} — {min_p}."
                })
            
            if players_count > max_p:
                raise serializers.ValidationError({
                    "numberOfPlayers": f"Максимальное количество игроков для {sport.name} — {max_p}."
                })
        data['current_players'] = 1

        return data

    
class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['id', 'name', 'min_required_players', 'max_required_players']