from django.db.models import Sum
from ..user.models import UserSportStats
from ..requests.models import ActivityRequest
from ..rank_service import get_sport_rank, get_roman_numeral
from django.contrib.auth import get_user_model

def get_profile_stats(user):
    all_stats = UserSportStats.objects.filter(user=user)

    aggregates = all_stats.aggregate(total_wins = Sum('wins'), total_losses = Sum('losses'))
    wins = aggregates['total_wins'] or 0
    losses = aggregates['total_losses'] or 0
    total_games = wins + losses

    global_win_rate = round((wins / total_games) * 100, 1) if total_games > 0 else 0.0
    
    User = get_user_model()
    rank_position = User.objects.filter(global_rating__gt=user.global_rating).count() + 1

    return {
        'global_win_rate': global_win_rate,
        'global_rank_position': rank_position,
        'total_games_played': total_games
    }

def get_other_sports_list(user, exclude_sport_id=None):
    query = UserSportStats.objects.filter(user=user)
    if exclude_sport_id:
        query = query.exclude(id=exclude_sport_id)

    other_stats = query.order_by('-rating')[:4]

    results = []
    for stat in other_stats:
        rank_data = get_sport_rank(stat.rating)
        results.append({
            'sport_name': stat.sport.name,
            'rating': stat.rating,
            'rank_image': rank_data['rank_image'],
            'roman_numeral': get_roman_numeral(rank_data['rank_name'])
        })

    return results
