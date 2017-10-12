from __future__ import unicode_literals

from django.db import models

# Create your models here.


class JobListing(models.Model):
    title = models.CharField(max_length=128, default='')
    salary = models.FloatField()