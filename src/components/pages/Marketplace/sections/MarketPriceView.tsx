import React, { useState } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import CropPricesTab from './CropPricesTab';
import InputPrice from './InputPricesTab';
import RegionalTab from './RegionalTab';
import NewsTab from './NewsTab';

interface MarketFilters {
  location: string;
  product?: string;
  unit: string;
  timePeriod: string;
  search?: string;
  category?: string;
}

interface MarketPriceViewProps {
  filters: MarketFilters;
}

const MarketPriceView: React.FC<MarketPriceViewProps> = ({ filters }) => {
  const [activeSubTab, setActiveSubTab] = useState('crop-prices');

  const subTabs = [
    { id: 'crop-prices', label: 'Crop Prices' },
    { id: 'input-prices', label: 'Input Prices' },
    { id: 'regional', label: 'Regional' },
    { id: 'news', label: 'News' }
  ];

  // Mock data for default view
  const priceData = [
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

  const priceStats = {
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

  // Function to render the active tab content
  const renderTabContent = () => {
    switch (activeSubTab) {
      case 'crop-prices':
        return <CropPricesTab filters={filters} />;
      case 'input-prices':
        return <InputPrice filters={filters} />;
      case 'regional':
        return <RegionalTab filters={filters} />;
      case 'news':
        return <NewsTab />;
      default:
        // Default view - original chart and statistics
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
                  Based on historical trends and current market conditions, prices for Maize in Arusha are expected to increase by approximately 10% in the next three months. Consider timing your market activities accordingly.
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
    }
  };

  return (
    <div className="bg-white">
      {/* Sub Tabs */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex gap-8">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-2 font-medium transition-colors relative ${
                activeSubTab === tab.id
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
        
        {/* Additional Charts Row - only show in default view */}
        {activeSubTab === 'crop-prices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Price Distribution */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Price Distribution</h4>
              <div className="flex items-center justify-center h-32">
                <svg width="120" height="120">
                  <circle cx="60" cy="60" r="50" fill="#10b981" />
                  <circle cx="60" cy="60" r="35" fill="#34d399" />
                  <circle cx="60" cy="60" r="20" fill="#6ee7b7" />
                  <text x="60" y="40" textAnchor="middle" className="text-xs fill-white font-medium">Retail: 30%</text>
                  <text x="60" y="55" textAnchor="middle" className="text-xs fill-white font-medium">Wholesale</text>
                  <text x="60" y="80" textAnchor="middle" className="text-xs fill-gray-700 font-medium">Export: 10%</text>
                </svg>
              </div>
              <div className="flex justify-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 mr-1"></div>
                  <span>Wholesale</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 mr-1"></div>
                  <span>Retail</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-300 mr-1"></div>
                  <span>Export</span>
                </div>
              </div>
            </div>

            {/* Seasonality */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Seasonality</h4>
                <div className="h-32 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 300 120">
                  {/* Y-axis grid lines */}
                  {[45, 70, 105].map((y, i) => (
                  <line
                    key={i}
                    x1="40"
                    y1={y}
                    x2="260"
                    y2={y}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                  ))}
                  {/* Bars */}
                  {[
                  { quarter: 'Q1', height: 60, x: 55, value: 1200 },
                  { quarter: 'Q2', height: 80, x: 105, value: 1600 },
                  { quarter: 'Q3', height: 90, x: 155, value: 1800 },
                  { quarter: 'Q4', height: 85, x: 205, value: 1700 }
                  ].map((bar, i) => (
                  <g key={i}>
                    <rect
                    x={bar.x}
                    y={100 - bar.height}
                    width="30"
                    height={bar.height}
                    fill="#10b981"
                    rx="3"
                    />
                    <text
                    x={bar.x + 15}
                    y="115"
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                    >
                    {bar.quarter}
                    </text>
                    <text
                    x={bar.x + 15}
                    y={100 - bar.height - 5}
                    textAnchor="middle"
                    className="text-xs fill-gray-700"
                    >
                    {bar.value}
                    </text>
                  </g>
                  ))}
                  {/* Y-axis labels */}
                  <text x="35" y="45" textAnchor="end" className="text-xs fill-gray-500">1600</text>
                  <text x="35" y="70" textAnchor="end" className="text-xs fill-gray-500">800</text>
                  <text x="35" y="105" textAnchor="end" className="text-xs fill-gray-500">0</text>
                </svg>
                </div>
              <div className="flex justify-center mt-2">
                <div className="flex items-center text-xs">
                  <div className="w-3 h-3 bg-green-500 mr-1"></div>
                  <span className="text-gray-600">Average Price (TZS)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPriceView;