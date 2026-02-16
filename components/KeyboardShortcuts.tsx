"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, X, Command, Phone, MessageSquare, Mail, Users, Mic, Megaphone, LayoutDashboard, Settings, FileText, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchItem {
  name: string;
  href: string;
  icon: React.ElementType;
  category: string;
  keywords: string[];
}

const searchItems: SearchItem[] = [
  { name: "Calls", href: "/", icon: Phone, category: "Pages", keywords: ["calls", "phone", "voice", "dial"] },
  { name: "Messages", href: "/messages", icon: MessageSquare, category: "Pages", keywords: ["messages", "whatsapp", "sms", "chat", "text"] },
  { name: "Emails", href: "/emails", icon: Mail, category: "Pages", keywords: ["emails", "mail", "send", "inbox"] },
  { name: "Audience", href: "/audience", icon: Users, category: "Pages", keywords: ["audience", "contacts", "people", "debtors"] },
  { name: "Agents", href: "/agents", icon: Mic, category: "Pages", keywords: ["agents", "ai", "voice", "bot"] },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone, category: "Pages", keywords: ["campaigns", "outreach", "batch"] },
  { name: "Metrics", href: "/metrics", icon: LayoutDashboard, category: "Pages", keywords: ["metrics", "analytics", "dashboard", "stats", "performance"] },
  { name: "Settings", href: "/settings", icon: Settings, category: "Pages", keywords: ["settings", "config", "preferences", "account"] },
  { name: "API Keys", href: "/settings", icon: Zap, category: "Settings", keywords: ["api", "keys", "token", "authentication"] },
  { name: "Team Members", href: "/settings", icon: Users, category: "Settings", keywords: ["team", "members", "invite", "users"] },
  { name: "Billing & Usage", href: "/settings", icon: FileText, category: "Settings", keywords: ["billing", "usage", "plan", "pricing", "cost"] },
  { name: "Juan Martinez", href: "/audience/1", icon: Users, category: "Contacts", keywords: ["juan", "martinez", "visa-1234"] },
  { name: "Vana Peru B0-30", href: "/campaigns/1", icon: Megaphone, category: "Campaigns", keywords: ["vana", "peru", "campaign"] },
  { name: "Nexo Mexico Early", href: "/campaigns/2", icon: Megaphone, category: "Campaigns", keywords: ["nexo", "mexico", "campaign"] },
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query) return searchItems;
    const q = query.toLowerCase();
    return searchItems.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    );
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(o => !o);
        setQuery("");
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setShowHelp(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowHelp(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (item: SearchItem) => {
    router.push(item.href);
    setIsOpen(false);
    setQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[selectedIndex]) { handleSelect(filtered[selectedIndex]); }
  };

  const shortcuts = [
    { keys: ["⌘", "K"], description: "Open quick search" },
    { keys: ["⌘", "/"], description: "Show keyboard shortcuts" },
    { keys: ["↑", "↓"], description: "Navigate results" },
    { keys: ["↵"], description: "Select result" },
    { keys: ["ESC"], description: "Close dialogs" },
  ];

  if (!isOpen && !showHelp) return null;

  // Group filtered results by category
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SearchItem[]>);

  let flatIndex = 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in" onClick={() => { setIsOpen(false); setShowHelp(false); }} />

      {isOpen && (
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search pages, contacts, campaigns..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleSearchKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 text-sm" autoFocus />
              <kbd className="hidden sm:inline-flex px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No results for &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-2">{category}</div>
                    {items.map(item => {
                      const currentIndex = flatIndex++;
                      const Icon = item.icon;
                      return (
                        <button key={item.name + item.href} onClick={() => handleSelect(item)}
                          className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                            currentIndex === selectedIndex ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          }`}>
                          <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-900 dark:text-white">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4 text-[10px] text-gray-400 dark:text-gray-500">
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↵</kbd> Select</span>
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd> Close</span>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Command className="w-5 h-5 text-gray-900 dark:text-white" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Keyboard Shortcuts</h2>
              </div>
              <button onClick={() => setShowHelp(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-3">
              {shortcuts.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{s.description}</span>
                  <div className="flex items-center gap-1">
                    {s.keys.map((key, j) => (
                      <kbd key={j} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-600">{key}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
