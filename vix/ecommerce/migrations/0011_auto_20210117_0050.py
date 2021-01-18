# Generated by Django 3.1.4 on 2021-01-17 00:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0010_contactusmessage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchase',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.product')),
                ('purchase_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.purchaseorder')),
            ],
        ),
        migrations.RemoveField(
            model_name='purchaseorder',
            name='products',
            field=models.ManyToManyField(through='ecommerce.Purchase', to='ecommerce.Product'),
        ),
        migrations.AddField(
            model_name='purchaseorder',
            name='products',
            field=models.ManyToManyField(through='ecommerce.Purchase', to='ecommerce.Product'),
        ),
    ]
