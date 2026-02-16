"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Phone, 
  MessageSquare,
  Users,
  Megaphone,
  LayoutDashboard,
  PlayCircle 
} from "lucide-react";

const navigation = [
  { name: "Calls", href: "/", icon: Phone },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Audience", href: "/audience", icon: Users },
  { name: "Campaigns", href: "/campaigns", icon: Megaphone },
  { name: "Metrics", href: "/metrics", icon: LayoutDashboard },
  { name: "Playground", href: "/playground", icon: PlayCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white text-sm font-bold">
          K
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">kleva</h1>
          <span className="text-xs text-gray-500">Pro</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-medium">
            VU
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              Vana User
            </div>
            <div className="text-xs text-gray-500 truncate">Vana</div>
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
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User email at bottom */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium">
            E
          </div>
          <span className="text-xs text-gray-600">ed@kleva.co</span>
        </div>
      </div>
    </div>
  );
}
