from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Student(models.Model):
    first_name = models.CharField(max_length=128, default='')
    last_name = models.CharField(max_length=128, default='')
    email = models.CharField(max_length=255, default='')
    need_visa = models.NullBooleanField()
    location = models.CharField(max_length=255)

