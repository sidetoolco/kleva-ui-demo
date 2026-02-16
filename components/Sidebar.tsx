"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  MessageSquare,
  Mail,
  Users,
  Mic,
  Megaphone,
  LayoutDashboard,
  Settings as SettingsIcon,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Tooltip } from "./Tooltip";

const navigation = [
  { name: "Calls", href: "/", icon: Phone, badge: null },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: "3" },
  { name: "Emails", href: "/emails", icon: Mail, badge: null },
  { name: "Audience", href: "/audience", icon: Users, badge: null },
  { name: "Agents", href: "/agents", icon: Mic, badge: null },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone, badge: "2" },
  { name: "Metrics", href: "/metrics", icon: LayoutDashboard, badge: null },
  { name: "Settings", href: "/settings", icon: SettingsIcon, badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-lg flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold">
          K
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">kleva</h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">Pro</span>
        </div>
        {/* Theme Toggle */}
        <Tooltip content={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </Tooltip>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center text-white dark:text-gray-900 text-xs font-medium">
            VU
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              Vana User
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Vana</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
              {item.badge && (
                <span className="ml-auto text-[10px] font-bold bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User email at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs font-medium">
            E
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">ed@kleva.co</span>
        </div>
      </div>
    </div>
  );
}
