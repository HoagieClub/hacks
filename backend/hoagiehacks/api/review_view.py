from hoagiehacks.models import CustomUser, CourseReview
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView


class ReviewSerializer(serializers.ModelSerializer):
    user_net_ids = serializers.SerializerMethodField()

    class Meta:
        model = CourseReview
        fields = [
            "id",
            "course_name",
            "rating",
            "user_net_ids",
        ]

    def get_user_net_ids(self, obj):
        return [user.net_id for user in obj.users.all()]


class CreateReviewView(APIView):
    """Handle create review operations."""

    def post(self, request) -> Response:
        """Create a new review."""
        try:
            user_net_ids = request.data.get("user_net_ids", [])
            course_name = request.data.get("course_name")
            rating = request.data.get("rating")

            if not course_name or rating is None:
                return Response(
                    {"detail": "Course name and rating are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            review = CourseReview.objects.create(course_name=course_name, rating=rating)
            # Add users to the review
            for net_id in user_net_ids:
                try:
                    user = CustomUser.objects.get(net_id=net_id)
                    review.users.add(user)
                except CustomUser.DoesNotExist:
                    pass

            serializer = ReviewSerializer(review)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ReviewView(APIView):
    """Handle review operations."""

    def get(self, request, review_id: int) -> Response:
        """Get all details associated with a given review."""
        try:
            review = CourseReview.objects.get(id=review_id)
        except CourseReview.DoesNotExist:
            return Response(
                {"detail": "CourseReview not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = ReviewSerializer(review)
        return Response(serializer.data)


class UserReviewsView(APIView):
    """Handle user reviews operations."""

    def get(self, request, net_id: str) -> Response:
        """Get all reviews associated with a given user net_id."""
        try:
            user = CustomUser.objects.get(net_id=net_id)
            reviews = CourseReview.objects.filter(users=user)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
