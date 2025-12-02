from django.utils import timezone
from rest_framework import serializers
from .models import ActivityRequest, Sport
from datetime import datetime
from django.contrib.auth import get_user_model

User = get_user_model()

class ParticipantSerializer(serializers.ModelSerializer):
    formatted_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'formatted_name']

    def get_formatted_name(self, obj):
        parts = obj.full_name.split()
        first_name = parts[0] if parts else ""
        last_name = parts[1] if len(parts) > 1 else ""

        if last_name:
            return f'{first_name} ({obj.username}) {last_name}'
        return f'{first_name} ({obj.username})'

class RequestListSerializer(serializers.ModelSerializer):
    eventName = serializers.CharField(source='title')
    sport = serializers.CharField(source='sport.name')
    date = serializers.DateTimeField(source='event_date', format="%d.%m.%Y, %H:%M")

    playersCount = serializers.IntegerField(source='players_count')
    currentPlayers = serializers.IntegerField(source='participants.count')

    applicationStatus = serializers.CharField(source='get_status_display')
    gameResult = serializers.CharField(source='game_result_text')

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
        result = obj.game_result_text
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
        players_count = data.get('players_count') 

        if players_count is not None:
            sport_pk = data.get('sport')
            if sport_pk is None:
                raise serializers.ValidationError({"sport": "Вид спорта должен быть указан."})
                
            try:
                sport_id = sport_pk.id if isinstance(sport_pk, Sport) else sport_pk
                sport = Sport.objects.get(pk=sport_id)

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

        return data

    
class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['id', 'name', 'min_required_players', 'max_required_players']

class SportNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ['id', 'name']

class AllRequestsListSerializer(serializers.ModelSerializer):
    sport = SportNameSerializer(read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    players_info = serializers.SerializerMethodField()
    current_players = serializers.IntegerField(source='participants.count', read_only=True)
    class Meta:
        model = ActivityRequest
        fields = [
            'id',
            'title',
            'sport',
            'current_players',
            'players_count',
            'players_info',
            'event_date',
            'location',
            'status',
            'status_display'
        ]

    def get_players_info(self, obj):
        return f'{obj.participants.count()}/{obj.players_count}'

class RequestDetailSerializer(serializers.ModelSerializer):
    sport = serializers.CharField(source='sport.name')
    sport_id = serializers.IntegerField(source='sport.id')
    creator = ParticipantSerializer(source='request_creator', read_only=True)
    participants = ParticipantSerializer(many=True, read_only=True)

    current_players = serializers.SerializerMethodField()
    is_organizer = serializers.SerializerMethodField()
    is_participant = serializers.SerializerMethodField()

    status_display = serializers.CharField(source='get_status_display', read_only=True)
    date = serializers.DateTimeField(source='event_date', format="%d.%m.%Y, %H:%M")

    personal_result = serializers.SerializerMethodField()
    game_result_text = serializers.CharField()

    class Meta:
        model = ActivityRequest
        fields = [
            'id', 'title', 'sport', 'sport_id', 'description', 
            'date', 'location', 
            'status', 'status_display',
            'players_count', 'current_players',
            'creator', 'participants',
            'is_organizer', 'is_participant',
            'game_result_text',
            'personal_result'
        ]

    def get_personal_result(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None
        
        if obj.participants.filter(id=request.user.id).exists():
            return None
        
        if obj.winners.filter(id=request.user.id).exists():
            return 'Win'
        else:
            return 'Loss'

    def get_is_organizer(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.request_creator == request.user
        return False
    
    def get_is_participant(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.participants.filter(id=request.user.id).exists()
        return False

    def get_current_players(self, obj):
        return obj.participants.count()
