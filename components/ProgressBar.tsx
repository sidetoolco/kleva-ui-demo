interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "purple" | "green" | "blue" | "yellow" | "red";
}

export function ProgressBar({
  value,
  max,
  showLabel = false,
  size = "md",
  color = "purple",
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    purple: "bg-purple-600 dark:bg-purple-500",
    green: "bg-green-600 dark:bg-green-500",
    blue: "bg-blue-600 dark:bg-blue-500",
    yellow: "bg-yellow-600 dark:bg-yellow-500",
    red: "bg-red-600 dark:bg-red-500",
  };

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{value.toLocaleString()} / {max.toLocaleString()}</span>
          <span className="font-medium">{percentage.toFixed(1)}%</span>
        </div>
      )}
    </div>
  );
}
