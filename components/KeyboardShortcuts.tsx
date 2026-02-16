"use client";

import { useEffect, useState } from "react";
import { Search, X, Command } from "lucide-react";
import { useRouter } from "next/navigation";

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Cmd/Ctrl + / for help
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setShowHelp(true);
      }
      
      // ESC to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowHelp(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    { keys: ["⌘", "K"], description: "Open quick search" },
    { keys: ["⌘", "/"], description: "Show keyboard shortcuts" },
    { keys: ["G", "C"], description: "Go to Calls" },
    { keys: ["G", "M"], description: "Go to Messages" },
    { keys: ["G", "A"], description: "Go to Audience" },
    { keys: ["G", "S"], description: "Go to Settings" },
    { keys: ["ESC"], description: "Close dialogs" },
  ];

  const quickLinks = [
    { name: "Calls", href: "/" },
    { name: "Messages", href: "/messages" },
    { name: "Emails", href: "/emails" },
    { name: "Audience", href: "/audience" },
    { name: "Agents", href: "/agents" },
    { name: "Campaigns", href: "/campaigns" },
    { name: "Metrics", href: "/metrics" },
    { name: "Settings", href: "/settings" },
  ];

  if (!isOpen && !showHelp) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={() => {
          setIsOpen(false);
          setShowHelp(false);
        }}
      />

      {/* Quick Search Modal */}
      {isOpen && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-slide-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for pages, actions, or commands..."
                className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
                autoFocus
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2">
                Quick Links
              </div>
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm text-gray-900 dark:text-white"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">ESC</kbd> to close</span>
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">⌘/</kbd> for help</span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help Modal */}
      {showHelp && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 animate-slide-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Command className="w-5 h-5 text-gray-900 dark:text-white" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Keyboard Shortcuts
                </h2>
              </div>
              <button 
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-3">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <kbd
                        key={i}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-600"
                      >
                        {key}
                      </kbd>
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
