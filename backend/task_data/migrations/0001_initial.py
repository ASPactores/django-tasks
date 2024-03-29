# Generated by Django 5.0.1 on 2024-01-21 12:32

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskGroup',
            fields=[
                ('group_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('group_name', models.CharField(max_length=30)),
                ('group_owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TaskDetails',
            fields=[
                ('task_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('task_name', models.CharField(max_length=100)),
                ('task_notes', models.CharField(max_length=500)),
                ('task_due_date', models.DateField()),
                ('task_done', models.BooleanField(default=False)),
                ('task_owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('task_group', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='task_data.taskgroup')),
            ],
        ),
    ]
