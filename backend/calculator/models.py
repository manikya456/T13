from django.db import models

class Calculation(models.Model):
    number1 = models.FloatField()
    number2 = models.FloatField()
    operation = models.CharField(max_length=20)
    result = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.number1} {self.operation} {self.number2} = {self.result}"
