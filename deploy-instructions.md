# Production Deployment Güvenlik Talimatları

## Environment Variables

Production sunucusunda aşağıdaki environment variable'ları tanımlamanız gerekiyor:

```bash
# RobotPos API Configuration
ROBOTPOS_API_URL=https://pos-integration.robotpos.com/realtimeapi/api/query
ROBOTPOS_API_TOKEN=153ca5e3-6ab4-4365-952a-e9652f77a519

# Login Configuration  
LOGIN_USERNAME=robotpos
LOGIN_PASSWORD=123
```

## Güvenlik Notları

1. **ASLA** API token'ları frontend kodunda bulundurmayin
2. Tüm hassas bilgiler backend environment variable'larında saklanmalı
3. Frontend sadece authenticated API endpoint'lerini kullanmalı
4. Production'da HTTPS kullanın

## Deployment Komutları

```bash
# Environment variable'ları ayarla
export ROBOTPOS_API_URL="https://pos-integration.robotpos.com/realtimeapi/api/query"
export ROBOTPOS_API_TOKEN="153ca5e3-6ab4-4365-952a-e9652f77a519"
export LOGIN_USERNAME="robotpos"
export LOGIN_PASSWORD="123"

# Uygulamayı başlat
npm run build
npm start
```

## PM2 ile Deployment (Önerilen)

```bash
# ecosystem.config.js dosyası oluştur
module.exports = {
  apps: [{
    name: 'td-invoice',
    script: 'npm',
    args: 'start',
    env: {
      PORT: 3078,
      ROBOTPOS_API_URL: 'https://pos-integration.robotpos.com/realtimeapi/api/query',
      ROBOTPOS_API_TOKEN: '153ca5e3-6ab4-4365-952a-e9652f77a519',
      LOGIN_USERNAME: 'robotpos',
      LOGIN_PASSWORD: '123'
    }
  }]
}

# PM2 ile başlat
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```