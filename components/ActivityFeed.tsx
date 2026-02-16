"use client";

import { useState, useEffect } from "react";
import { Phone, MessageSquare, DollarSign, CheckCircle } from "lucide-react";

interface ActivityItem {
  id: number;
  type: "call" | "message" | "promise" | "payment";
  text: string;
  time: string;
}

const activities: ActivityItem[] = [
  { id: 1, type: "call", text: "Call completed with Juan Martinez", time: "2m ago" },
  { id: 2, type: "promise", text: "Promise secured: $1,250 from VISA-1234", time: "5m ago" },
  { id: 3, type: "message", text: "WhatsApp delivered to Maria Gonzalez", time: "8m ago" },
  { id: 4, type: "call", text: "Call completed with Pedro Silva", time: "12m ago" },
  { id: 5, type: "payment", text: "Payment received: $2,100 from Carmen Lopez", time: "15m ago" },
  { id: 6, type: "message", text: "SMS sent to Roberto Diaz", time: "18m ago" },
  { id: 7, type: "promise", text: "Promise secured: $890 from AUTO-9012", time: "22m ago" },
  { id: 8, type: "call", text: "No answer: Sofia Mendez", time: "25m ago" },
];

const newActivities: ActivityItem[] = [
  { id: 100, type: "promise", text: "Promise secured: $3,200 from Miguel Angel", time: "just now" },
  { id: 101, type: "call", text: "Call completed with Ana Torres", time: "just now" },
  { id: 102, type: "payment", text: "Payment received: $750 from Patricia Ruiz", time: "just now" },
  { id: 103, type: "message", text: "WhatsApp read by Carlos Ramirez", time: "just now" },
];

const iconMap = {
  call: { icon: Phone, bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600 dark:text-blue-400" },
  message: { icon: MessageSquare, bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-600 dark:text-green-400" },
  promise: { icon: CheckCircle, bg: "bg-emerald-100 dark:bg-emerald-900/30", color: "text-emerald-600 dark:text-emerald-400" },
  payment: { icon: DollarSign, bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-600 dark:text-purple-400" },
};

export function ActivityFeed() {
  const [items, setItems] = useState(activities);
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    // Simulate new activities appearing
    const interval = setInterval(() => {
      const randomNew = newActivities[Math.floor(Math.random() * newActivities.length)];
      const item = { ...randomNew, id: Date.now(), time: "just now" };
      setItems(prev => [item, ...prev.slice(0, 7)]);
      setNewCount(c => c + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Live Activity</h3>
        </div>
        {newCount > 0 && (
          <span className="text-[10px] font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
            +{newCount} new
          </span>
        )}
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {items.slice(0, 6).map((item, index) => {
          const { icon: Icon, bg, color } = iconMap[item.type];
          return (
            <div key={item.id} className={`px-4 py-3 flex items-center gap-3 transition-all duration-500 ${index === 0 ? "bg-green-50/50 dark:bg-green-900/10" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}>
              <div className={`w-7 h-7 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{item.text}</p>
              </div>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
