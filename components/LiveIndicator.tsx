export function LiveIndicator({ text = "Live" }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-2 py-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
      </span>
      <span className="text-xs font-medium text-red-700 dark:text-red-400">{text}</span>
    </div>
  );
}
