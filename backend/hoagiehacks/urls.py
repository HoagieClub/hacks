"""
URL configuration for hoagiehacks project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from hoagiehacks.api.user_view import CreateUserView, UserView
from hoagiehacks.api.review_view import CreateReviewView, ReviewView, UserReviewsView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("user/", CreateUserView.as_view(), name="user"),
    path("user/<str:net_id>/", UserView.as_view(), name="user-detail"),
    path("review/", CreateReviewView.as_view(), name="review"),
    path("review/<int:review_id>/", ReviewView.as_view(), name="review-detail"),
    path("user/<str:net_id>/reviews/", UserReviewsView.as_view(), name="user-reviews"),
]
