# Susrutha Institute of Ayurvedic Sciences - Public Web Portal

Official public frontend web application for Susrutha Institute of Ayurvedic Sciences & Panchakarma Hospital built with Next.js 16 (App Router), React 19, TypeScript, and TailwindCSS v4.

---

## 🛠️ Local Development Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

The frontend application runs on `http://localhost:3000`.

---

## 🚀 VPS Production Deployment Commands

### 👑 All-In-One Master Deployment Command (Pull + Build + Clear Cache + Restart All)
```bash
(cd /home/susrutha/htdocs/susrutha.flumenx.in/backend && git pull && npm run build) && (cd /home/susrutha/htdocs/susrutha.flumenx.in/admin && git pull && rm -rf .next && npm run build) && (cd /home/susrutha/htdocs/susrutha.flumenx.in/frontend && git pull && ([ -d "frontend" ] && cd frontend || true) && rm -rf .next && npm run build) && pm2 restart all --update-env && (systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null || true)
```

---

### 📦 Individual Single Project Commands

#### 1. Web Frontend Only (`frontend`)
```bash
cd /home/susrutha/htdocs/susrutha.flumenx.in/frontend && git pull && ([ -d "frontend" ] && cd frontend || true) && rm -rf .next && npm run build && pm2 restart susrutha-frontend
```

#### 2. Backend API Only (`backend`)
```bash
cd /home/susrutha/htdocs/susrutha.flumenx.in/backend && git pull && npm run build && pm2 restart susrutha-backend
```

#### 3. Admin Panel Only (`admin`)
```bash
cd /home/susrutha/htdocs/susrutha.flumenx.in/admin && git pull && rm -rf .next && npm run build && pm2 restart susrutha-admin
```
