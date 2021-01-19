# Generated by Django 3.1.4 on 2021-01-09 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0009_auto_20201229_1439'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUsMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.CharField(max_length=120)),
                ('subject', models.CharField(max_length=120)),
                ('message', models.TextField()),
                ('date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]