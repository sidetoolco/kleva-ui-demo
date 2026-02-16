# Kleva UI Demo

**Production-ready, feature-complete demo of Kleva's AI collections platform with Resend-inspired design.**

🔗 **Live Demo:** https://kleva-ui-demo.vercel.app  
📦 **GitHub:** https://github.com/sidetoolco/kleva-ui-demo

---

## ✨ Complete Feature Set

### 🎨 **UI Polish & Interactions**
- ✅ **Dark Mode** - System-wide theme toggle with smooth transitions
- ✅ **Loading States** - Skeleton loaders for all data tables and cards
- ✅ **Toast Notifications** - Success/error/info/warning messages with slide-in animation
- ✅ **Tooltips** - Contextual hints throughout the interface
- ✅ **Smooth Animations** - Fade-in, slide-in, count-up effects
- ✅ **Micro-interactions** - Button ripples, hover effects, focus states
- ✅ **Progress Bars** - Visual progress indicators with multiple colors
- ✅ **Live Indicators** - Animated pulse badges for active items
- ✅ **Empty States** - Helpful messaging when no data exists

### ⌨️ **Keyboard Shortcuts**
- `⌘/Ctrl + K` - Open quick search
- `⌘/Ctrl + /` - Show keyboard shortcuts help
- `ESC` - Close modals and dialogs
- Quick navigation to any page

### 📊 **Data Management**
- ✅ **Working Search** - Real-time filtering across all tables
- ✅ **Column Sorting** - Click any column header to sort
- ✅ **Pagination** - Smart page navigation with ellipsis
- ✅ **CSV Export** - Download filtered data
- ✅ **Bulk Actions** - Multi-select with batch operations
- ✅ **Working Filters** - Dropdown filters that actually work

### 📞 **Communication Channels**
- **Calls** - AI voice call history with status tracking, search, sort, export
- **Messages** - WhatsApp and SMS communications
- **Emails** - Email campaigns with open/click tracking

### 👥 **Contact Management**
- **Audience** - Complete contact database with bulk actions
- **Contact Details** - Individual profiles with full activity timeline
- **Interaction History** - Chronological view of all touchpoints

### 🎙️ **Agent Management**
- **Agent List** - All AI voice agents with performance metrics
- **Test Interface** - Live testing modal for agents
- **Performance Tracking** - Promise rates, call duration, campaigns

### 📈 **Analytics**
- **Metrics Dashboard** - Interactive charts and KPIs
- **Promise Rate Trends** - Weekly performance visualization
- **Call Volume Charts** - Daily patterns with bar graphs
- **Top Performers** - Best agents and campaigns
- **Cost Tracking** - ROI and efficiency metrics

### 🎯 **Campaign Management**
- **Campaign List** - All active, paused, and completed campaigns
- **Campaign Details** - Deep dive with stats and activity timeline
- **Clickable Navigation** - Seamless drill-down experience
- **Performance Metrics** - Answer rates, conversion, collected amounts

### ⚙️ **Settings**
- **Account** - Profile and company information
- **API Keys** - Production and development key management
- **Webhooks** - Configure endpoint URLs and events
- **Team** - Invite and manage team members
- **Billing** - Usage tracking and plan management
- **Notifications** - Email preferences with toggles

---

## 🎨 Design System

### Color Palette
```css
/* Light Mode */
--gray-900: #111827;  /* Primary text */
--gray-500: #6b7280;  /* Secondary text */
--gray-200: #e5e7eb;  /* Borders */

/* Dark Mode */
--gray-900: #f9fafb;  /* Primary text */
--gray-700: #374151;  /* Borders */
--gray-800: #1f2937;  /* Backgrounds */

/* Status Colors */
--green-500: #10b981;  /* Success */
--blue-500: #3b82f6;   /* Info */
--yellow-500: #f59e0b; /* Warning */
--red-500: #ef4444;    /* Error */
--purple-500: #a855f7; /* Accent */
```

### Typography
- **Font Family:** -apple-system, SF Pro, Helvetica Neue
- **Headings:** 24px-36px, font-bold
- **Body:** 14px-16px, font-medium
- **Labels:** 12px-14px, font-medium, text-gray-500

### Spacing
- **Container:** max-w-7xl (1280px)
- **Padding:** 8rem (128px) desktop, 4rem mobile
- **Gap:** 1.5rem (24px) for grids and lists
- **Border Radius:** 0.5rem (8px) standard, 9999px for pills

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State:** React Hooks (useState, useMemo, useEffect)
- **Animations:** CSS animations + Tailwind transitions

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/sidetoolco/kleva-ui-demo.git
cd kleva-ui-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

**Option 1: Vercel CLI**
```bash
npm i -g vercel
vercel --prod
```

**Option 2: GitHub Integration**
1. Push to GitHub
2. Import repo in Vercel dashboard
3. Click "Deploy"

---

## 📄 Pages

### Core Pages
- `/` - Calls (default home)
- `/messages` - WhatsApp & SMS
- `/emails` - Email campaigns
- `/audience` - Contact list
- `/audience/[id]` - Contact details
- `/agents` - AI agent management
- `/campaigns` - Campaign list
- `/campaigns/[id]` - Campaign details
- `/metrics` - Analytics dashboard
- `/settings` - Account settings

### Features Per Page
| Page | Search | Sort | Filter | Export | Pagination | Bulk Actions |
|------|--------|------|--------|--------|------------|--------------|
| Calls | ✅ | ✅ | ✅ | ✅ | ✅ | - |
| Messages | ✅ | - | ✅ | - | - | - |
| Emails | ✅ | - | ✅ | - | - | - |
| Audience | ✅ | - | ✅ | - | - | ✅ |
| Campaigns | ✅ | - | ✅ | - | - | - |
| Agents | ✅ | - | ✅ | - | - | - |

---

## 🎯 Component Library

### Layout Components
- `Sidebar` - Navigation with dark mode toggle
- `KeyboardShortcuts` - Cmd+K search and help modal

### Data Display
- `TableSkeleton` - Loading state for tables
- `CardSkeleton` - Loading state for cards
- `Pagination` - Smart pagination with ellipsis
- `ProgressBar` - Progress indicators
- `LiveIndicator` - Animated pulse badge

### Feedback Components
- `Toast` - Notification system
- `Tooltip` - Contextual hints
- Empty states with icons and messages

### Theme
- `ThemeProvider` - Dark mode management
- `useTheme()` - Theme hook

---

## ⌨️ Keyboard Shortcuts Guide

| Shortcut | Action |
|----------|--------|
| `⌘/Ctrl + K` | Open quick search |
| `⌘/Ctrl + /` | Show shortcuts help |
| `G C` | Go to Calls |
| `G M` | Go to Messages |
| `G A` | Go to Audience |
| `G S` | Go to Settings |
| `ESC` | Close modals/dialogs |

---

## 📊 Sample Data

The demo includes production-ready mock data:
- **10 calls** with various outcomes and timestamps
- **10 messages** (WhatsApp + SMS mix)
- **10 emails** with tracking data
- **10 contacts** with full interaction history
- **5 AI agents** with performance metrics
- **5 campaigns** with stats and activity

---

## 🎨 Dark Mode

Toggle between light and dark themes:
- Click moon/sun icon in sidebar
- Automatically saves preference
- Smooth color transitions
- Optimized for readability

---

## 🚧 Future Enhancements

- [ ] Real-time updates via WebSocket
- [ ] Advanced filter builder
- [ ] Custom dashboard widgets
- [ ] Drag & drop reordering
- [ ] Split view mode
- [ ] Voice recording playback
- [ ] Multi-language support
- [ ] White-label customization

---

## 📝 License

MIT License - Feel free to use for your own projects

---

## 🙏 Credits

**Design Inspiration:** Resend  
**Built with:** Next.js, Tailwind CSS, TypeScript  
**Icons:** Lucide React  

---

**Made with ❤️ for Kleva**
