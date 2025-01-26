from django.contrib.auth import logout
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Category, NeuralNetwork, Review
from .serializers import CategorySerializer, NeuralNetworkSerializer, ReviewSerializer, UserSerializer, LogoutSerializer
from .permissions import IsAdminOrReadOnly


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Регистрация должна быть доступна всем


class HomeView(APIView):
    """
    Главная страница API, получение популярных категорий и нейросетей.
    """
    permission_classes = [IsAdminOrReadOnly]


    def get(self, request, *args, **kwargs):
        return Response({
            "cta": {
                "message": "Welcome to kolofasIO API!",
                "user": request.user.username if request.user.is_authenticated else None
            }
        }, status=status.HTTP_200_OK)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email
        })


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class NeuralNetworkCreateView(generics.ListCreateAPIView):
    queryset = NeuralNetwork.objects.all()
    serializer_class = NeuralNetworkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class NeuralNetworkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = NeuralNetwork.objects.all()
    serializer_class = NeuralNetworkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LogoutSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        refresh_token = serializer.validated_data['refresh_token']
        try:
            token = RefreshToken(refresh_token)

            # Проверка: токен уже в черном списке
            if BlacklistedToken.objects.filter(token__jti=token['jti']).exists():
                return Response({"detail": "Token is already blacklisted."}, status=status.HTTP_200_OK)

            # Добавление токена в черный список
            token.blacklist()
            return Response({"detail": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

