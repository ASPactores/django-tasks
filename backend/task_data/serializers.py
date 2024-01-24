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


class TaskGroupRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = TaskGroup
        fields = ["group_id", "group_name"]


class TaskGroupRetrieveDetailSerializers(serializers.ModelSerializer):
    task_group = TaskGroupRetrieveSerializers()

    class Meta:
        model = TaskDetail
        depth = 1
        exclude = ["task_owner"]
        read_only = ["group_name", "group_id"]
