# AthleteLink

Веб-приложение для организации любительских спортивных игр. Ключевые функции включают подбор команд и соперников, а также систему рейтинга для формирования сбалансированных по уровню команд.

## 🏗️ Архитектура проекта

### Backend (Django)
- **Django** - основной веб-фреймворк
- **Django REST Framework** - для создания API
- **База данных PostgreSQL** - заменена с SQLite для production-использования
- **django-cors-headers** - для обработки CORS запросов

### Frontend
- **React** - фронтенд-фреймворк
- **Vite** - сборщик фронтенд приложения
- **Tailwind CSS** - для стилизации

### Инфраструктура (Docker)
- **Docker** - контейнеризация приложения
- **Docker Compose** - оркестрация контейнеров
- **Nginx** - веб-сервер и прокси
- **PostgreSQL** - контейнер с базой данных

### 📁 Структура проекта
```
athletelink/
├── backend/                 # Django приложение
│   ├── athlete_link/       # Основной проект Django
│   ├── events/             # Приложение мероприятий
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/               # React приложение
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── nginx/                  # Конфигурация Nginx
│   └── nginx.conf
├── docker-compose.yml      # Docker Compose конфигурация
└── README.md
```


## 🚀 Запуск проекта

### Предварительные требования
- Docker
- Docker Compose

### 1. Клонирование репозитория

**Bash (Linux/Mac/Git Bash):**
```
git clone https://gitlab.mai.ru/layar/athletelink.git
cd athletelink
```
**CMD (Windows):**

```
git clone https://gitlab.mai.ru/layar/athletelink.git
cd athletelink
```
### 2. Настройка переменных окружения

Создайте файл .env в корне проекта со следующим содержимым:

**env**
```
# Django
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# База данных PostgreSQL
DB_NAME=athletelink_db
DB_USER=athletelink_user
DB_PASSWORD=your-strong-password
DB_HOST=db
DB_PORT=5432

# Frontend
VITE_API_URL=http://localhost:8000/api
```
Важно: Замените your-secret-key-here на надежный секретный ключ и your-strong-password на надежный пароль для базы данных.

### 3. Запуск контейнеров
Bash (Linux/Mac/Git Bash):

bash
docker-compose up --build
CMD (Windows):

cmd
docker-compose up --build
Эта команда:

Соберет образы для backend, frontend и nginx

Запустит PostgreSQL базу данных

Запустит миграции Django

Соберет статические файлы Django

Запустит все сервисы

4. Проверка работы
После успешного запуска приложение будет доступно по адресам:

Frontend: http://localhost

Backend API: http://localhost/api

Админка Django: http://localhost/admin

5. Создание суперпользователя (опционально)
Для доступа к админке Django создайте суперпользователя:

Bash (Linux/Mac/Git Bash):

bash
docker-compose exec backend python manage.py createsuperuser
CMD (Windows):

cmd
docker-compose exec backend python manage.py createsuperuser
🛠️ Команды для разработки
Запуск в фоновом режиме
Bash:

bash
docker-compose up -d
CMD:

cmd
docker-compose up -d
Просмотр логов
Bash:

bash
docker-compose logs -f
CMD:

cmd
docker-compose logs -f
Остановка контейнеров
Bash:

bash
docker-compose down
CMD:

cmd
docker-compose down
Полная остановка с удалением volumes (осторожно!)
Bash:

bash
docker-compose down -v
CMD:

cmd
docker-compose down -v
Пересборка и запуск
Bash:

bash
docker-compose up --build
CMD:

cmd
docker-compose up --build
Выполнение миграций
Bash:

bash
docker-compose exec backend python manage.py migrate
CMD:

cmd
docker-compose exec backend python manage.py migrate
Создание миграций
Bash:

bash
docker-compose exec backend python manage.py makemigrations
CMD:

cmd
docker-compose exec backend python manage.py makemigrations
Сбор статических файлов
Bash:

bash
docker-compose exec backend python manage.py collectstatic --noinput
CMD:

cmd
docker-compose exec backend python manage.py collectstatic --noinput
Просмотр запущенных контейнеров
Bash:

bash
docker-compose ps
CMD:

cmd
docker-compose ps
Перезапуск конкретного сервиса
Bash:

bash
docker-compose restart backend
CMD:

cmd
docker-compose restart backend
🔧 Конфигурация Docker
Сервисы в docker-compose.yml:
db - PostgreSQL база данных

backend - Django приложение

frontend - React приложение

nginx - Веб-сервер и прокси

Важные особенности:
База данных: Переход с SQLite на PostgreSQL завершен, используется в production-режиме

Volumes: Данные PostgreSQL сохраняются в named volume postgres_data

Сети: Все сервисы объединены в внутреннюю сеть athletelink_network

Зависимости: Backend ждет готовности базы данных перед запуском

📊 Миграция с SQLite на PostgreSQL
Проект успешно переведен с SQLite на PostgreSQL со следующими изменениями:

Настройки базы данных в backend/athlete_link/settings.py

Docker конфигурация с отдельным контейнером PostgreSQL

Переменные окружения для гибкой конфигурации подключения к БД

🔒 Безопасность
DEBUG режим отключен в production

Статические файлы обслуживаются через Nginx

CORS настроен для фронтенда

Используются переменные окружения для чувствительных данных

🐛 Решение проблем
Проблема: Ошибка подключения к базе данных
Bash:

bash
docker-compose down -v
docker-compose up --build
CMD:

cmd
docker-compose down -v
docker-compose up --build
Проблема: Миграции не применяются
Bash:

bash
docker-compose exec backend python manage.py migrate
CMD:

cmd
docker-compose exec backend python manage.py migrate
Проблема: Статические файлы не загружаются
Bash:

bash
docker-compose exec backend python manage.py collectstatic --noinput
CMD:

cmd
docker-compose exec backend python manage.py collectstatic --noinput
Проблема: Порт уже занят
Остановите другие службы, использующие порты 80, 8000 или 5432, или измените порты в docker-compose.yml.

Проблема: Ошибки прав доступа (Linux/Mac)
Bash:

bash
sudo chown -R $USER:$USER .
docker-compose up --build
📞 Поддержка
При возникновении проблем с запуском проекта, обратитесь к разработчику, ответственного за Docker-конфигурацию и миграцию базы данных.

💡 Примечания для разных ОС
Для пользователей Windows:
Убедитесь, что Docker Desktop запущен

Команды CMD работают в стандартной командной строке Windows

Для лучшей совместимости рекомендуется использовать PowerShell или WSL2

Для пользователей Linux/Mac:
Команды bash работают в терминале

Может потребоваться использование sudo в зависимости от настроек Docker

Теперь ваша команда сможет работать с проектом независимо от используемой операционной системы!