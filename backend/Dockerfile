# Pythonベースイメージ
FROM python:3.11-slim

# 環境変数設定
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピーしてインストール
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt

# ソースコードをコピー
COPY . /app/

# Djangoの起動コマンド（docker-compose.ymlで上書きも可）
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
