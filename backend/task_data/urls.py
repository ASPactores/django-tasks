from django.urls import path
from . import views

urlpatterns = [
    path("today", views.get_task_today, name="get_task_today"),
    path("upcoming", views.get_upcoming_tasks, name="get_upcoming_tasks"),
    path("all", views.get_all_tasks, name="get_all_tasks"),
    path("group", views.get_task_group, name="get_task_group"),
    path(
        "group/<uuid:group_id>", views.get_task_by_group_id, name="get_task_by_group_id"
    ),
    path(
        "detail/<uuid:task_id>",
        views.get_task_details_by_task_id,
        name="get_task_by_id",
    ),
    path("create-group", views.post_task_group, name="create_task_group"),
    path("add-task", views.post_task, name="post_task"),
    path("update-task/<uuid:task_id>", views.edit_task_done, name="update_task"),
]
