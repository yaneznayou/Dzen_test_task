# 🚀 Деплой на Railway

Это пошаговая инструкция для деплоя проекта на Railway.

## Подготовка

1. **Зарегистрируйтесь на Railway**
   - Перейдите на [railway.app](https://railway.app)
   - Войдите через GitHub

2. **Подготовьте репозиторий**
   - Убедитесь, что все изменения закоммичены в GitHub
   - Проект должен содержать файлы: `docker-compose.yml`, `Dockerfile.frontend`, `Dockerfile.websocket`

## Вариант 1: Автоматический деплой (Рекомендуется)

### Шаг 1: Создание проекта
1. Нажмите **"New Project"**
2. Выберите **"Deploy from GitHub repo"**
3. Выберите ваш репозиторий

### Шаг 2: Railway автоматически создаст сервисы
Railway обнаружит `docker-compose.yml` и создаст два сервиса:
- `frontend` (Next.js приложение)
- `websocket` (WebSocket сервер)

### Шаг 3: Настройка переменных окружения

#### Для сервиса `websocket`:
1. Откройте сервис `websocket`
2. Перейдите в раздел **"Variables"**
3. Добавьте переменные:
   ```
   NODE_ENV=production
   PORT=3001
   ```

#### Для сервиса `frontend`:
1. Откройте сервис `frontend`
2. Перейдите в раздел **"Variables"**
3. Добавьте переменные:
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_WS_URL=https://your-websocket-service.railway.app
   ```

**ВАЖНО**: Замените `your-websocket-service` на реальный URL вашего websocket сервиса.

### Шаг 4: Получение URL'ов
1. В каждом сервисе перейдите в **"Settings"** → **"Networking"**
2. Нажмите **"Generate Domain"**
3. Скопируйте сгенерированные URL'ы

### Шаг 5: Обновление переменных
1. Обновите `NEXT_PUBLIC_WS_URL` в frontend сервисе, используя реальный URL websocket сервиса
2. Добавьте в websocket сервис:
   ```
   FRONTEND_URL=https://your-frontend-service.railway.app
   ```

### Шаг 6: Повторный деплой
После обновления переменных окружения, Railway автоматически пересоберет и задеплоит сервисы.

## Вариант 2: Ручное создание сервисов

### Шаг 1: Создание WebSocket сервиса
1. **New Project** → **Deploy from GitHub repo**
2. Выберите репозиторий
3. В настройках деплоя:
   - **Build Command**: `docker build -f Dockerfile.websocket -t websocket .`
   - **Start Command**: `node server.js`
4. Добавьте переменные окружения:
   ```
   NODE_ENV=production
   PORT=3001
   ```

### Шаг 2: Создание Frontend сервиса
1. **New Project** → **Deploy from GitHub repo**
2. Выберите тот же репозиторий
3. В настройках деплоя:
   - **Build Command**: `docker build -f Dockerfile.frontend -t frontend .`
   - **Start Command**: `node server.js`
4. Добавьте переменные окружения:
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_WS_URL=https://your-websocket-service.railway.app
   ```

## Проверка деплоя

1. **Откройте frontend URL** - должно загрузиться приложение
2. **Проверьте WebSocket подключение** - в правом верхнем углу должен отображаться счетчик активных сессий
3. **Проверьте функциональность** - попробуйте удалить товар из заказа

## Возможные проблемы и решения

### WebSocket не подключается
- Убедитесь, что `NEXT_PUBLIC_WS_URL` содержит правильный HTTPS URL
- Проверьте, что websocket сервис запущен и доступен

### CORS ошибки
- Убедитесь, что `FRONTEND_URL` в websocket сервисе содержит правильный URL frontend'а
- Проверьте, что оба URL используют HTTPS

### Сборка падает
- Проверьте логи сборки в Railway
- Убедитесь, что все зависимости установлены

## Финальные URL'ы

После успешного деплоя у вас будет:
- **Frontend**: `https://your-frontend-service.railway.app`
- **WebSocket**: `https://your-websocket-service.railway.app`

Эти URL'ы можно использовать для демонстрации тестового задания!

## Локальное тестирование Docker

Перед деплоем можно протестировать локально:

```bash
# Сборка и запуск
docker-compose up --build

# Проверка
# Frontend: http://localhost:3000
# WebSocket: http://localhost:3001
```

## Обновление после деплоя

Railway автоматически пересобирает и деплоит при каждом push в главную ветку GitHub репозитория.
