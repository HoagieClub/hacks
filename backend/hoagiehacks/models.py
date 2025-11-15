from django.contrib.auth.models import AbstractUser
from django.db import models


class Major(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150, db_index=True, null=True)
    code = models.CharField(max_length=10, db_index=True, null=True)

    class Meta:
        db_table = "Major"


class CustomUser(AbstractUser):
    """HoagieHacks user."""

    net_id = models.CharField(max_length=20, unique=True, db_index=True)
    class_year = models.IntegerField()
    major = models.ForeignKey(Major, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "User"

    def __str__(self):
        return f"{self.get_full_name()} ({self.net_id})"


class Review(models.Model):
    """Review model for HoagieHacks."""

    users = models.ManyToManyField(CustomUser, related_name="reviews")
    content = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "Review"

    def __str__(self):
        user_count = self.users.count()
        return f"Review with {user_count} user(s) - Rating: {self.rating}"
