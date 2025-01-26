from django.urls import path
from django.contrib.auth import views as auth_views
from .views import (CategoryListCreateView, NeuralNetworkCreateView, ReviewListCreateView, CategoryDetailView,
                    NeuralNetworkDetailView, HomeView, UserCreateView, ReviewDetailView, LogoutView, ProfileView)

urlpatterns = [
    # Главная страница
    path('home/', HomeView.as_view(), name='home-api'),


    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('networks/', NeuralNetworkCreateView.as_view(), name='network-list'),
    path('networks/<int:pk>/', NeuralNetworkDetailView.as_view(), name='network-detail'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('register/', UserCreateView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
