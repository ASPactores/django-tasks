from rest_framework import serializers
from .models import TaskDetail, TaskGroup


class TaskDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = TaskDetail
        fields = "__all__"


class TaskGroupSerializers(serializers.ModelSerializer):
    class Meta:
        model = TaskGroup
        fields = "__all__"
