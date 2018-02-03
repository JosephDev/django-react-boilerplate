from django.db import models
import datetime


class PostModel(models.Model):
    title=models.CharField(max_length=200)
    text=models.TextField()
    created_date=models.DateTimeField(auto_now_add=True)
