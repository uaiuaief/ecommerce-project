from django.db import models
from PIL import Image


class Product(models.Model):
    name = models.CharField(max_length=40)
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to="product_images")
    
    def __str__(self):
        return f"{self.name}"

    def save(self):
        super().save()
        img = Image.open(self.image.path)

        width, height = [img.width, img.height]
        if width > height:
            diff = width - height
            side = diff / 2
            x1 = side
            x2 = width - side
            area = (x1, 0, x2, height)
            img = img.crop(area)

        elif width < height:
            diff = height - width
            side = diff / 2
            y1 = side
            y2 = height - side
            area = (0, y1, width, y2)
            img = img.crop(area)

        if img.height > 600 or img.width > 600:
            output_size = (600, 600)
            img.thumbnail(output_size)
            img.save(self.image.path) 
        else:
            img.save(self.image.path)
      

