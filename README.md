# Kleva UI Demo

Modern, Resend-inspired UI demo for Kleva's AI collections platform.

## Features

- 🎨 Clean, minimal design inspired by Resend
- 📊 Dashboard with stats cards and activity table
- 📞 Calls page with detailed history
- 🎯 Campaigns page with status management
- 📱 Fully responsive design
- 🎭 Tab navigation on each page
- 🔍 Search and filter functionality
- 📈 Status badges and visual indicators

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

#### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd kleva-ui-demo
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **kleva-ui-demo**
- In which directory is your code located? **./**
- Want to modify settings? **N**

Your demo will be live at `https://kleva-ui-demo-xxxxx.vercel.app`

#### Option 2: GitHub + Vercel Dashboard

1. **Push to GitHub:**
```bash
cd kleva-ui-demo
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kleva-ui-demo.git
git push -u origin main
```

2. **Deploy on Vercel:**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Click "Deploy"

Done! Your demo is live.

## Pages

### Dashboard (`/`)
- Minutes balance indicator
- 9 key metric cards
- Recent activity table with live campaigns
- Time range selector and filters

### Campaigns (`/campaigns`)
- Tab navigation (Active, Scheduled, Paused, Completed)
- Campaign stats overview
- Searchable campaign table
- Status badges and country flags
- Bulk actions and export

### Calls (`/calls`)
- Tab navigation (All Calls, Answered, Voicemail, No Answer, Disputes)
- Call history with outcomes
- Debtor avatars with initials
- Recording playback indicators
- Duration and agent tracking

### Agents (`/agents`)
- Coming soon placeholder

### Playground (`/playground`)
- Coming soon placeholder

## Design Patterns from Resend

✅ Clean sidebar navigation with user profile
✅ Tab-based page organization
✅ Searchable data tables
✅ Status badge system (green/yellow/red/gray)
✅ Action buttons (Filters, Export, Create)
✅ Avatar initials for privacy
✅ Subtle borders and spacing
✅ Hover states on interactive elements

## Customization

### Colors

Update colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#a855f7',  // Purple
      success: '#10b981',  // Green
      warning: '#f59e0b',  // Yellow
      danger: '#ef4444',   // Red
    }
  }
}
```

### Mock Data

Edit mock data in:
- `app/page.tsx` - Dashboard stats
- `components/RecentActivity.tsx` - Campaign data
- `app/campaigns/page.tsx` - Campaign list
- `app/calls/page.tsx` - Call history

## Next Steps

To connect to real data:

1. Add API routes in `app/api/`
2. Integrate with Kleva backend
3. Add authentication (Clerk, NextAuth)
4. Implement real-time updates
5. Add loading and error states

## License

MIT
