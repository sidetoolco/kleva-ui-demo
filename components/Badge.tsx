interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  pulse = false,
}: BadgeProps) {
  const variantClasses = {
    success: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    error: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    neutral: "bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded border transition-all ${variantClasses[variant]} ${sizeClasses[size]} ${
        pulse ? "animate-pulse" : ""
      }`}
    >
      {children}
    </span>
  );
}
