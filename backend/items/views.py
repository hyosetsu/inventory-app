from rest_framework import viewsets, permissions
from .models import Item
from .serializers import ItemSerializer

class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Item.objects.all()  # ← これを追加

    # 👇 ログインユーザーの持ち物だけ取得
    def get_queryset(self):
        return Item.objects.filter(owner=self.request.user).order_by('-created_at')

    # 👇 新規追加時に自動的にownerを紐付け
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
