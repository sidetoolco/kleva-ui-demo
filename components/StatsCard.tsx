import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  change: string;
  trend: "up" | "down" | "neutral";
  highlight?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  change, 
  trend, 
  highlight 
}: StatsCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-400";

  return (
    <div className={`p-6 bg-white rounded-lg border transition-all hover:shadow-md ${
      highlight ? "border-green-500 border-l-4" : "border-gray-200"
    }`}>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {highlight && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">{description}</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">83% recovery rate</p>
          </div>
        )}
        {!highlight && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <TrendIcon className={`w-4 h-4 ${trendColor}`} />
        <span className="text-gray-600">{change}</span>
      </div>
    </div>
  );
}
