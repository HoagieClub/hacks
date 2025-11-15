from django.contrib.auth.models import AbstractUser
from django.db import models


class Major(models.Model):
    """Major model."""
    id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=10, db_index=True, null=True)

    class Meta:
        db_table = "Major"


class CustomUser(AbstractUser):
    """CustomUser model."""

    net_id = models.CharField(max_length=20, unique=True, db_index=True)
    class_year = models.IntegerField()
    major = models.ForeignKey(Major, on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = "User"

    def __str__(self):
        return f"{self.get_full_name()} ({self.net_id})"


class CourseReview(models.Model):
    """CourseReview model."""

    users = models.ManyToManyField(CustomUser, related_name="reviews")
    course_name = models.TextField()
    rating = models.IntegerField()

    class Meta:
        db_table = "CourseReview"

    def __str__(self):
        user_count = self.users.count()
        return f"Review with {user_count} user(s) - Rating: {self.rating}"
