SPORT_RANKS = [
    ("Искра I", 0, 300, "/bronze.png"), ("Искра II", 300, 600, "/bronze.png"), ("Искра III", 600, 1000, "/bronze.png"),
    ("Отблеск I", 1000, 1500, "/silver.png"), ("Отблеск II", 1500, 2000, "/silver.png"), ("Отблеск III", 2000, 2500, "/silver.png"),
    ("Вихрь I", 2500, 3250, "/gold.png"), ("Вихрь II", 3250, 4500, "/gold.png"), ("Вихрь III", 4500, 6000, "/gold.png"),
    ("Призмарин I", 6000, 7500, "/diamond.png"), ("Призмарин II", 7500, 9000, "/diamond.png"), ("Призмарин III", 9000, 11000, "/diamond.png"),
    ("Аметист I", 11000, 13000, "/mythic.png"), ("Аметист II", 13000, 15000, "/mythic.png"), ("Аметист III", 15000, 17500, "/mythic.png"),
    ("Легенда I", 17500, 20000, "/legendary.png"), ("Легенда II", 20000, 23000, "/legendary.png"), ("Легенда III", 23000, 26000, "/legendary.png"),
    ("Высший трофей I", 26000, 30000, "/master.png"), ("Высший трофей II", 30000, 35000, "/master.png"), ("Высший трофей III", 35000, 40000, "/master.png"),
    ("Высший трофей III", 40000, float('inf'), "/master.png"), 
]

def get_sport_rank(rating):
    current_rank = SPORT_RANKS[0]
    
    for rank in SPORT_RANKS:
        if rating >= rank[1]:
            current_rank = rank
        else:
            break 
            
    name, min_r, max_r, image_url = current_rank

    if max_r == float('inf'):
        progress = 100
        required = 0
        target = min_r
    else:
        tier_range = max_r - min_r
        progress = ((rating - min_r) / tier_range) * 100
        required = max_r - rating
        target = max_r

    return {
        'rank_name': name,
        'rank_image': image_url,
        'progress_percent': round(progress, 1),
        'current_rating': rating,
        'next_rank_threshold': target,
        'points_needed': required
    }

def get_roman_numeral(rank_name):
    if not rank_name: return ""
    parts = rank_name.split(' ')
    if len(parts) < 2: return ""
    return parts[-1]

PRESTIGE_TIERS = [
    (1, 100),    
    (2, 300),  
    (3, 600),   
    (4, 1000),   
    (5, 1500),    
    (6, 2100),   
    (7, 2800),
    (8, 3600),
    (9, 4500),
    (10, 5500),
    (11, 6600),
    (12, 7800),
    (13, 9100),
    (14, 10500),
    (15, 12000),
    (16, 13600),
    (17, 15300),
    (18, 17100),
    (19, 19000),
    (20, 21000),
    (21, 23100),
    (22, 25300),
    (23, 27600),
    (24, 30000),
    (25, 32500),
    (26, 35100),
    (27, 37800),
    (28, 40600),
    (29, 43500),
    (30, 46500),
    (31, 49600),
    (32, 52800),
    (33, 56100),
    (34, 59500),
    (35, 63000),
    (36, 66600),
    (37, 70300),
    (38, 74100),
    (39, 78000),
    (40, 82000),
    (41, 86100),
    (42, 90300),
    (43, 94600),
    (44, 99000),
    (45, 103500),
    (46, 108100),
    (47, 112800),
    (48, 117600),
    (49, 122500),
    (50, 127500),
    (51, 132600),
    (52, 137800),
    (53, 143100),
    (54, 148500),
    (55, 154000),
    (56, 159600),
    (57, 165300),
    (58, 171100),
    (59, 177000),
    (60, 183000),
    (61, 189100),
    (62, 195300),
    (63, 201600), 
    (64, float('inf')) 
]


def calculate_prestige_data(rating):
    """Определяет общий уровень престижа."""
    current_level = (0, 0) 
    next_level = PRESTIGE_TIERS[0]
    
    for i, tier in enumerate(PRESTIGE_TIERS):
        if rating >= tier[1]:
            current_level = tier
            if i + 1 < len(PRESTIGE_TIERS):
                next_level = PRESTIGE_TIERS[i+1]
            else:
                next_level = None 
        else:
            next_level = tier
            break
            
    lvl_num, min_r = current_level
    
    if next_level:
        target = next_level[1]
        needed = target - rating

        prev_threshold = min_r
        range_val = target - prev_threshold

        if range_val == 0: range_val = 100 
        progress = ((rating - prev_threshold) / range_val) * 100
    else:
        target = min_r
        needed = 0
        progress = 100

    return {
        'level': lvl_num,
        'rating': rating,
        'progress_percent': round(max(0, progress), 1),
        'points_needed_next_level': needed
    }