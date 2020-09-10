"""
WSGI config for Red_Tetris project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os, sys
sys.path.append('/home/sibonelo/django/apps/django/django_projects/Red_Tetris')
os.environ.setdefault("PYTHON_EGG_CACHE", "/home/sibonelo/django/apps/django/django_projects/Red_Tetris/egg_cache")


from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Red_Tetris.settings')

application = get_wsgi_application()
