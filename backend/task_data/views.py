from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from .models import TaskDetail, TaskGroup
from datetime import date
from .serializers import (
    TaskDetailSerializers,
    TaskGroupSerializers,
    TaskGroupRetrieveDetailSerializers,
)
from rest_framework import status

# from django.shortcuts import get_object_or_404


# Get tasks today
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_task_today(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    tasks = TaskDetail.objects.filter(
        task_owner=user.id, task_due_date=date.today()
    ).order_by("task_due_date")
    serializer = TaskDetailSerializers(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get upcoming tasks
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_upcoming_tasks(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    tasks = TaskDetail.objects.filter(
        task_owner=user.id, task_due_date__gt=date.today()
    ).order_by("task_due_date")
    serializer = TaskDetailSerializers(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get all tasks
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    tasks = TaskDetail.objects.filter(task_owner=user.id).order_by("task_due_date")
    serializer = TaskGroupRetrieveDetailSerializers(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get task group
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_task_group(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    task_group = TaskGroup.objects.filter(group_owner=user.id)
    serializer = TaskGroupSerializers(task_group, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get task by group id
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_task_by_group_id(request, group_id):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    task = TaskDetail.objects.filter(task_owner_id=user.id, task_group_id=group_id)
    serializer = TaskGroupRetrieveDetailSerializers(task, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Get task details by task id
@api_view(["GET"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def get_task_details_by_task_id(request, task_id):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    task_details = TaskDetail.objects.filter(task_owner=user.id, task_id=task_id)
    serializer = TaskDetailSerializers(task_details, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# Post task group
@api_view(["POST"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def post_task_group(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    request.data["group_owner"] = user.id
    serializer = TaskGroupSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


# Post task
@api_view(["POST"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def post_task(request):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    request.data["task_owner"] = user.id
    serializer = TaskDetailSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)


# Edit task_done
@api_view(["PUT"])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def edit_task_done(request, task_id):
    token = request.headers.get("Authorization").split(" ")[1]
    user = Token.objects.get(key=token).user
    task = TaskDetail.objects.get(task_owner=user.id, task_id=task_id)
    task.task_done = request.data["task_done"]
    task.save()
    return Response(status=status.HTTP_204_NO_CONTENT)
