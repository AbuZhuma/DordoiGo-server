# Используем базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./
RUN npm install

# Копируем .env файл в рабочую директорию
COPY .env ./

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Устанавливаем рабочую директорию, где находится код
WORKDIR /app/src

# Открываем порт 5000
EXPOSE 5000

# Запускаем приложение
CMD ["node", "server.js"]
