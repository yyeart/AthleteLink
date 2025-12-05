#!/bin/bash

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Apply database migrations"
python manange.py migrate

echo "Starting server..."
python manage.py runserver