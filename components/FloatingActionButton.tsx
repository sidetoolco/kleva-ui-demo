"use client";

import { Plus } from "lucide-react";
import { ReactNode } from "react";

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
}

export function FloatingActionButton({
  onClick,
  icon = <Plus className="w-6 h-6" />,
  label,
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110"
      aria-label={label}
    >
      <div className="flex items-center gap-3 px-6 py-4">
        {label && (
          <span className="font-medium text-sm whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300">
            {label}
          </span>
        )}
        <div className="flex-shrink-0">{icon}</div>
      </div>
      
      {/* Ripple effect on click */}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
}
