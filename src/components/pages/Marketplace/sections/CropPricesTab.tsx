import React from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import type { MarketFilters, PriceData, PriceStats } from './types';

interface CropPricesTabProps {
  filters: MarketFilters;
}

const CropPricesTab: React.FC<CropPricesTabProps> = ({ filters }) => {
  // Mock data - in real app, this would come from props or API
  const priceData: PriceData[] = [
    { month: 'Jan', price: 1100 },
    { month: 'Feb', price: 1250 },
    { month: 'Mar', price: 1200 },
    { month: 'Apr', price: 1350 },
    { month: 'May', price: 1320 },
    { month: 'Jun', price: 1380 },
    { month: 'Jul', price: 1450 },
    { month: 'Aug', price: 1520 },
    { month: 'Sep', price: 1480 },
    { month: 'Oct', price: 1420 },
    { month: 'Nov', price: 1380, forecast: 1450 },
    { month: 'Dec', price: 1350, forecast: 1480 }
  ];

  const priceStats: PriceStats = {
    current: 1350,
    average: 1425,
    highest: 1600,
    lowest: 1150,
    volatility: 'Medium',
    change: 10.2
  };

  const maxPrice = Math.max(...priceData.map(d => Math.max(d.price, d.forecast || 0)));
  const minPrice = Math.min(...priceData.map(d => d.price));

  const getYPosition = (price: number) => {
    return ((maxPrice - price) / (maxPrice - minPrice)) * 200 + 20;
  };

  const pathData = priceData.map((d, i) => {
    const x = (i / (priceData.length - 1)) * 580 + 40;
    const y = getYPosition(d.price);
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
  }).join(' ');

  const forecastPath = priceData
    .map((d, i) => {
      if (d.forecast) {
        const x = (i / (priceData.length - 1)) * 580 + 40;
        const y = getYPosition(d.forecast);
        return { x, y, month: d.month };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-3">
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Chart Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-green-600 mb-1">
                  {filters.product || 'Maize'} Prices - {filters.location}
                </h2>
                <div className="flex items-center text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">+{priceStats.change}% YoY</span>
                </div>
              </div>
              <button className="flex items-center text-gray-500 text-sm">
                <Calendar size={16} className="mr-1" />
                {filters.timePeriod}
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="p-4">
            <div className="h-64 mb-4">
              <svg width="100%" height="100%" viewBox="0 0 660 260" className="overflow-visible">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line
                    key={i}
                    x1="40"
                    y1={50 + i * 40}
                    x2="620"
                    y2={50 + i * 40}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}

                {/* Price line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  className="drop-shadow-sm"
                />

                {/* Forecast line */}
                {forecastPath.length > 1 && (
                  <path
                    d={`M ${forecastPath[0]?.x} ${forecastPath[0]?.y} L ${forecastPath[1]?.x} ${forecastPath[1]?.y}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="8,4"
                  />
                )}

                {/* Data points */}
                {priceData.map((d, i) => {
                  const x = (i / (priceData.length - 1)) * 580 + 40;
                  const y = getYPosition(d.price);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#10b981"
                      className="drop-shadow-sm"
                    />
                  );
                })}

                {/* Forecast points */}
                {forecastPath.map((point, i) => (
                  <circle
                    key={`forecast-${i}`}
                    cx={point?.x}
                    cy={point?.y}
                    r="4"
                    fill="#10b981"
                    stroke="#fff"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                ))}

                {/* X-axis labels */}
                {priceData.map((d, i) => {
                  const x = (i / (priceData.length - 1)) * 580 + 40;
                  return (
                    <text
                      key={i}
                      x={x}
                      y="245"
                      textAnchor="middle"
                      className="text-xs fill-gray-500"
                    >
                      {d.month}
                    </text>
                  );
                })}

                {/* Y-axis labels */}
                {[maxPrice, maxPrice * 0.75, maxPrice * 0.5, maxPrice * 0.25, minPrice].map((price, i) => (
                  <text
                    key={i}
                    x="30"
                    y={50 + i * 40}
                    textAnchor="end"
                    className="text-xs fill-gray-500"
                    dominantBaseline="middle"
                  >
                    {Math.round(price)}
                  </text>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-green-500 mr-2"></div>
                <span className="text-gray-600">Price (TZS)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-0.5 bg-green-500 mr-2" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #10b981 0, #10b981 4px, transparent 4px, transparent 8px)' }}></div>
                <span className="text-gray-600">Forecast</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Price Forecast */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">AI Price Forecast</h4>
          <p className="text-sm text-green-700 mb-2">
            Based on historical trends and current market conditions, prices for {filters.product || 'Maize'} in {filters.location} are expected to increase by approximately 10% in the next three months. Consider timing your market activities accordingly.
          </p>
        </div>
      </div>

      {/* Price Statistics Sidebar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Price Statistics</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Current Price</div>
            <div className="text-lg font-bold text-gray-900">
              {priceStats.current.toLocaleString()} TZS/{filters.unit?.toLowerCase() || 'kg'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Average (3m)</div>
            <div className="text-lg font-bold text-gray-900">
              {priceStats.average.toLocaleString()} TZS/{filters.unit?.toLowerCase() || 'kg'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Highest (3m)</div>
            <div className="text-lg font-bold text-gray-900">
              {priceStats.highest.toLocaleString()} TZS/{filters.unit?.toLowerCase() || 'kg'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Lowest (3m)</div>
            <div className="text-lg font-bold text-gray-900">
              {priceStats.lowest.toLocaleString()} TZS/{filters.unit?.toLowerCase() || 'kg'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Volatility</div>
            <div className="text-lg font-bold text-gray-900">{priceStats.volatility}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPricesTab;