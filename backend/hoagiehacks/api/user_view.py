from hoagiehacks.models import CustomUser
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView


class UserSerializer(serializers.ModelSerializer):
    pass


class CreateUserView(APIView):
    """Handle create user operations."""

    def post(self, request) -> Response:
        """Create a new user."""
        try:
            user = CustomUser.objects.create()
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UserView(APIView):
    """Handle user operations."""

    def get(self, request, user_id: str) -> Response:
        """Get all details associated with a given user."""
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = UserSerializer(user)
        return Response(serializer.data)
