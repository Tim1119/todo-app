from django.urls import path
from .views import TodoViewset
from rest_framework import routers


router = routers.DefaultRouter()
router.register('todo',TodoViewset,basename='todo')

urlpatterns = [
  
]

urlpatterns+= router.urls