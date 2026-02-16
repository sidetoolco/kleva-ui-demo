# Quick Deploy Guide

## Option 1: Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Navigate to project
cd kleva-ui-demo

# 3. Install dependencies (if not done)
npm install

# 4. Deploy
vercel

# Follow prompts:
# - Set up and deploy? → Y
# - Which scope? → Select your account
# - Link to existing project? → N
# - Project name? → kleva-ui-demo (or custom name)
# - Directory? → ./
# - Modify settings? → N
```

Your demo will be live at: `https://kleva-ui-demo-xxxxx.vercel.app`

## Option 2: GitHub + Vercel Dashboard

```bash
# 1. Initialize Git
cd kleva-ui-demo
git init
git add .
git commit -m "Initial commit: Kleva UI demo"

# 2. Create repo on GitHub (github.com/new)
# Name: kleva-ui-demo
# Don't initialize with README

# 3. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/kleva-ui-demo.git
git branch -M main
git push -u origin main

# 4. Deploy on Vercel
# - Go to vercel.com
# - Click "New Project"
# - Import your GitHub repo
# - Click "Deploy"
```

Done! Your demo is live.

## Test Locally First

```bash
npm run dev
# Open http://localhost:3000
```

## After Deployment

Share your demo:
- Dashboard: `https://your-demo.vercel.app/`
- Campaigns: `https://your-demo.vercel.app/campaigns`
- Calls: `https://your-demo.vercel.app/calls`

## Custom Domain (Optional)

In Vercel dashboard:
1. Go to Project Settings
2. Domains
3. Add your domain (e.g., `demo.kleva.co`)
4. Follow DNS instructions
