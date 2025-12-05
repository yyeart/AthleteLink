from django.db import migrations
from django.conf import settings

def create_initial_sports(apps, schema_editor):
    Sport = apps.get_model('requests', 'Sport')
    
    if not Sport.objects.filter(name='Футбол').exists():
        Sport.objects.create(
            name='Футбол',
            min_required_players=10,
            max_required_players=22,
        )
    
    if not Sport.objects.filter(name='Баскетбол').exists():
        Sport.objects.create(
            name='Баскетбол',
            min_required_players=6,
            max_required_players=10,
        )

    if not Sport.objects.filter(name='Волейбол').exists():
        Sport.objects.create(
            name='Волейбол',
            min_required_players=4,
            max_required_players=12,
        )

    if not Sport.objects.filter(name='Теннис').exists():
        Sport.objects.create(
            name='Теннис',
            min_required_players=2,
            max_required_players=4,
        )

    if not Sport.objects.filter(name='Литрбол').exists():
        Sport.objects.create(
            name='Литрбол',
            min_required_players=1,
            max_required_players=15,
        )

class Migration(migrations.Migration):
    
    dependencies = [
        ('requests', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RunPython(create_initial_sports, migrations.RunPython.noop),
    ]