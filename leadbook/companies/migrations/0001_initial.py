# Generated by Django 2.1.5 on 2019-01-17 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('address_line_one', models.CharField(blank=True, max_length=255, null=True)),
                ('address_line_two', models.CharField(blank=True, max_length=255, null=True)),
                ('address_line_three', models.CharField(blank=True, max_length=255, null=True)),
                ('building', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
                ('province', models.CharField(blank=True, max_length=255, null=True)),
                ('postcode', models.CharField(blank=True, max_length=50, null=True)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('logo', models.CharField(blank=True, max_length=200, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
