# Generated by Django 5.0.1 on 2024-01-21 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task_data', '0005_alter_taskdetail_task_due_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskdetail',
            name='task_due_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
