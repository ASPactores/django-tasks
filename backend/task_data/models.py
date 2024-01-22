from django.db import models
import uuid
from django.conf import settings
from django.contrib import admin


# Table for the grouping of tasks
class TaskGroup(models.Model):
    group_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    group_name = models.CharField(max_length=30)
    group_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.group_name


# Table for the task details
class TaskDetail(models.Model):
    task_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task_name = models.CharField(max_length=100)
    task_notes = models.CharField(max_length=500, null=True, blank=True)
    task_due_date = models.DateField(null=True, blank=True)
    task_done = models.BooleanField(default=False)
    task_group = models.ForeignKey(
        TaskGroup, on_delete=models.CASCADE, null=True, blank=True
    )
    task_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )

    def __str__(self):
        return self.task_name


admin.site.register(TaskGroup)
admin.site.register(TaskDetail)
