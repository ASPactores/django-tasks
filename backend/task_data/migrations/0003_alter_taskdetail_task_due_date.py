# Generated by Django 5.0.1 on 2024-01-21 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_data', '0002_rename_taskdetails_taskdetail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskdetail',
            name='task_due_date',
            field=models.DateTimeField(),
        ),
    ]
