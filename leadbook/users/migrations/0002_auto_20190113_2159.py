# Generated by Django 2.1.5 on 2019-01-13 21:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='activation_code',
            field=models.CharField(max_length=255),
        ),
    ]