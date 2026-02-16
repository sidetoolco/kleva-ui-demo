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
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Tooltip } from "./Tooltip";

const navigation = [
  { name: "Calls", href: "/", icon: Phone },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Emails", href: "/emails", icon: Mail },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Agents", href: "/agents", icon: Mic },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Metrics", href: "/metrics", icon: LayoutDashboard },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold">
          K
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">kleva</h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">Pro</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 text-xs font-medium">
            VU
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
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
            <Tooltip key={item.name} content={item.name} position="right">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            </Tooltip>
          );
        })}
      </nav>

      {/* Theme Toggle & User email at bottom */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 text-xs font-medium">
              E
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">ed@kleva.co</span>
          </div>
          <Tooltip content={theme === "light" ? "Dark mode" : "Light mode"} position="top">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
