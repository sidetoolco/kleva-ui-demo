# Kleva UI Demo

Production-ready demo of Kleva's AI collections platform with Resend-inspired design.

## ✨ Features

### 📞 Communication Channels
- **Calls** - AI voice call history with status tracking
- **Messages** - WhatsApp and SMS communications
- **Emails** - Email campaign tracking with open/click rates

### 👥 Contact Management
- **Audience** - Complete contact database
- **Contact Details** - Individual profiles with activity timeline
- **Bulk Actions** - Select multiple contacts for batch operations
- **Export** - CSV export functionality

### 🎙️ Agent Management
- **Agent List** - All AI voice agents with performance metrics
- **Test Agent** - Live testing interface for agents
- **Performance Tracking** - Promise rates, call duration, campaigns

### 📊 Analytics
- **Metrics Dashboard** - KPIs, charts, and performance trends
- **Promise Rate Trends** - Weekly performance visualization
- **Call Volume Charts** - Daily call patterns
- **Top Performers** - Best agents and campaigns

### 🎯 Campaign Management
- **Campaign List** - All active, paused, and completed campaigns
- **Campaign Details** - Deep dive into each campaign with stats
- **Activity Timeline** - Recent promises, payments, and calls
- **Clickable Rows** - Navigate to campaign details

### ⚙️ Settings
- **Account** - Profile and company information
- **API Keys** - Manage production and development keys
- **Webhooks** - Configure webhook endpoints
- **Team** - Invite and manage team members
- **Billing** - Usage tracking and plan management
- **Notifications** - Email notification preferences

## 🎨 Design System

Built with Resend-inspired principles:
- ✅ Clean, minimal interface
- ✅ Subtle borders and spacing
- ✅ Soft status badges with pastel colors
- ✅ Smooth transitions and hover states
- ✅ Empty states with helpful messaging
- ✅ Responsive design for all screen sizes

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

The fastest way to deploy:

```bash
npm i -g vercel
vercel --prod
```

Or connect your GitHub repo to Vercel dashboard.

## 📄 Pages

### Communication
- `/` - Calls (home page)
- `/messages` - WhatsApp & SMS
- `/emails` - Email campaigns

### Management
- `/audience` - Contact list
- `/audience/[id]` - Contact details
- `/agents` - AI agent management
- `/campaigns` - Campaign list
- `/campaigns/[id]` - Campaign details

### Analytics & Settings
- `/metrics` - Performance dashboard
- `/settings` - Account settings

## 🎯 Key Features

### Working Search
Real-time filtering across all tables

### Export Functionality
Download data as CSV from any table

### Bulk Actions
Select multiple contacts for batch operations

### Status Tracking
Color-coded badges for all statuses:
- 🟢 Green - Success (Promise, Clicked, Read)
- 🔵 Blue - Info (Answered, Delivered, Opened)
- 🟡 Yellow - Warning (Callback, No Contact)
- 🔴 Red - Error (Bounced, Failed)
- ⚪ Gray - Neutral (Sent, Pending)

### Responsive Tables
- Hover effects
- Empty states
- Loading states
- Smooth animations

## 📊 Sample Data

The demo includes realistic mock data:
- 10 calls with various outcomes
- 10 messages (WhatsApp + SMS)
- 10 emails with tracking data
- 10 contacts with interaction history
- 5 AI agents with performance metrics
- 5 campaigns with stats

## 🎨 Color Palette

```css
--gray-900: #111827;  /* Primary text */
--gray-500: #6b7280;  /* Secondary text */
--gray-200: #e5e7eb;  /* Borders */

--green-500: #10b981;  /* Success */
--blue-500: #3b82f6;   /* Info */
--yellow-500: #f59e0b; /* Warning */
--red-500: #ef4444;    /* Error */
--purple-500: #a855f7; /* Accent */
```

## 🚧 Roadmap

Future enhancements:
- [ ] Real-time updates via WebSocket
- [ ] Advanced filters with saved views
- [ ] Custom dashboards
- [ ] White-label customization
- [ ] Multi-language support
- [ ] Dark mode

## 📝 License

MIT

---

**Live Demo:** https://kleva-ui-demo.vercel.app  
**GitHub:** https://github.com/sidetoolco/kleva-ui-demo
