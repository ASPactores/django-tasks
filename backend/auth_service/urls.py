from django.urls import path
from . import views

# from knox import views as knox_views

urlpatterns = [
    path("login", views.login, name="login"),
    path("signup", views.signup, name="signup"),
    path("is_authenticated", views.is_authenticated, name="is_authenticated"),
    # path("logout", knox_views.LogoutView.as_view(), name="logout"),
    path("logout", views.logout, name="logout"),
    # path("user_info", views.get_user_info, name="user_info"),
]
