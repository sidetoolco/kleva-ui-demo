export function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex gap-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded flex-1" />
        </div>
        
        {/* Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-b border-gray-100 px-6 py-4 flex gap-4 items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-100 rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        <div className="h-6 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-32" />
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-100 rounded w-1/4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-100 rounded w-16" />
              <div className="h-6 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
