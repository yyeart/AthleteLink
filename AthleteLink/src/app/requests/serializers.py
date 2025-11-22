from rest_framework import serializers
from .models import ActivityRequest
from datetime import datetime

class RequestListSerializer(serializers.ModelSerializer):
    eventName = serializers.CharField(source='event_name')
    applicationStatus = serializers.CharField(source='get_status_display')
    gameResult = serializers.CharField(source='get_result_display')

    resultColor = serializers.SerializerMethodField()

    date = serializers.DateTimeField(format="%d.%m.%Y, %H:%M")

    class Meta:
        model = ActivityRequest
        fields = [
            'id',
            'eventName',
            'date',
            'sport',
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
        else:
            return 'gray'

class RequestCreateSerializer(serializers.ModelSerializer):
    numberOfPlayers = serializers.IntegerField(source='players_count', min_value=1)
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

    def validate(self, data):
        date_str = data.get('date')
        time_str = data.get('time')

        if date_str and time_str:
            try:
                full_datetime_str = f"{date_str} {time_str}"
                event_datetime = datetime.strptime(full_datetime_str, "%d.%m.%Y %H:%M")
                data['event_date'] = event_datetime
                del data['date']
                del data['time']
            except ValueError:
                raise serializers.ValidationError("Неверный формат даты или времени")
        return data