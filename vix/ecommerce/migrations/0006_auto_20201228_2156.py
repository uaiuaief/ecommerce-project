# Generated by Django 3.1.4 on 2020-12-28 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0005_purchaseorder_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchaseorder',
            name='status',
            field=models.CharField(choices=[(1, 'waiting payment'), (2, 'payment confirmed'), (3, 'transaction complete'), (4, 'purchase cancelled')], default='waiting payment', max_length=20),
        ),
    ]
