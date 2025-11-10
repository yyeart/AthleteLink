import psycopg2
try:
    conn = psycopg2.connect(
        dbname='athletelink_db',
        user='athletelink_user', 
        password='athletelink_password',
        host='db',
        port='5432'
    )
    print('✅ БАЗА ДАННЫХ ДОСТУПНА!')
    conn.close()
except Exception as e:
    print('❌ Ошибка:', e)