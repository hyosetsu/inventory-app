# ベースイメージ
FROM node:22-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package*.json ./
RUN npm install -D tailwindcss postcss autoprefixer && \
    npm install react-hot-toast

# アプリ本体をコピー
COPY . .

# デフォルトコマンド
CMD ["npm", "run", "dev", "--", "--host"]
