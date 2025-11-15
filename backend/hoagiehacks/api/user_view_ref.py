from hoagiehacks.models import CustomUser, Major
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView


class UserSerializer(serializers.ModelSerializer):
    major_code = serializers.CharField(source='major.code', read_only=True)
    major_name = serializers.CharField(source='major.name', read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "first_name",
            "last_name",
            "net_id",
            "class_year",
            "major_code",
            "major_name",
        ]


class CreateUserView(APIView):
    """Handle create user operations."""

    def post(self, request) -> Response:
        """Create a new user."""
        request.data["username"] = f"{request.data['first_name']} {request.data['last_name']}".lower().replace(" ", "")

        # Handle major_code lookup or creation
        major_code = request.data.pop("major_code", None)
        if major_code:
            major, _ = Major.objects.get_or_create(
                code=major_code,
                defaults={"code": major_code}
            )
            request.data["major"] = major

        print(request.data)
        try:
            user = CustomUser.objects.create(**request.data)
        except Exception as e:
            return Response(
                {"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserView(APIView):
    """Handle user operations."""

    def get(self, request, net_id: str) -> Response:
        """Get all details associated with a given user."""
        try:
            user = CustomUser.objects.get(net_id=net_id)
        except CustomUser.DoesNotExist:
            return Response(
                {"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = UserSerializer(user)
        return Response(serializer.data)
