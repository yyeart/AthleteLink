from rest_framework import serializers
from .models import ActivityRequest

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
