#!/bin/bash

echo "🚀 Запуск Prom Clone..."

# Перевіряємо, чи встановлений .NET
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET не знайдено. Встановлюємо..."
    export PATH="$HOME/.dotnet:$PATH"
fi

# Перевіряємо версію .NET
echo "📦 .NET версія: $(dotnet --version)"

# Встановлюємо .NET залежності
echo "📥 Встановлення .NET залежностей..."
dotnet restore

# Збираємо проект
echo "🔨 Збірка .NET проекту..."
dotnet build

# Запускаємо .NET API в фоновому режимі
echo "🌐 Запуск .NET API..."
cd src/PromClone.API
dotnet run &
API_PID=$!
cd ../..

# Чекаємо трохи, щоб API запустився
echo "⏳ Чекаємо запуску API..."
sleep 5

# Перевіряємо, чи запустився API
if curl -s https://localhost:7001 > /dev/null 2>&1; then
    echo "✅ .NET API запущено на https://localhost:7001"
else
    echo "❌ .NET API не запустився"
fi

# Встановлюємо npm залежності
echo "📥 Встановлення npm залежностей..."
cd client
npm install

# Запускаємо React app
echo "⚛️  Запуск React app..."
npm start &
REACT_PID=$!
cd ..

echo ""
echo "🎉 Prom Clone запущено!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🌐 API: https://localhost:7001"
echo "📚 Swagger: https://localhost:7001/swagger"
echo ""
echo "Для зупинки натисніть Ctrl+C"

# Функція очищення при завершенні
cleanup() {
    echo ""
    echo "🛑 Зупинка сервісів..."
    kill $API_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    exit 0
}

# Перехоплюємо сигнал завершення
trap cleanup SIGINT SIGTERM

# Чекаємо завершення
wait 