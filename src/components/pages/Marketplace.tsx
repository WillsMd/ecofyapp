import { 
  Search,
  Filter,
  Bell,
  Download,
  Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const detailedMarketData = [
  { month: 'Jan', price: 900 },
  { month: 'Feb', price: 1200 },
  { month: 'Mar', price: 1100 },
  { month: 'Apr', price: 1250 },
  { month: 'May', price: 1300 },
  { month: 'Jun', price: 1350 },
  { month: 'Jul', price: 1400 },
  { month: 'Aug', price: 1450 },
  { month: 'Sep', price: 1500 },
  { month: 'Oct', price: 1400 },
  { month: 'Nov', price: 1350 },
  { month: 'Dec', price: 1600 }
];
const Marketplace = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Marketplace</h2>
      
      <div className="flex gap-4 mb-6">
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg">
          Market Price
        </button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">All Products</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Crops</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Livestock</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Poultry</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Fisheries</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Seeds</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Fertilizers</button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">Equipment</button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Location</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Arusha</option>
            <option>Morogoro</option>
            <option>Mbeya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Product</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Maize</option>
            <option>Rice</option>
            <option>Wheat</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Unit</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>Kilogram (kg)</option>
            <option>Tonne</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time Period</label>
          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
          <Filter size={16} />
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
          <Bell size={16} />
          Set Alerts
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={16} />
          Download
        </button>
        <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
          <Share2 size={16} />
          Share
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <button className="bg-white p-4 rounded-lg shadow-sm border-b-2 border-emerald-500">
          <div className="font-semibold">Crop Prices</div>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm">
          <div className="font-semibold">Input Prices</div>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm">
          <div className="font-semibold">Regional</div>
        </button>
        <button className="bg-white p-4 rounded-lg shadow-sm">
          <div className="font-semibold">News</div>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-emerald-600">Maize Prices - Arusha</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-emerald-600">📈 +10% YoY</span>
              </div>
            </div>
            
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detailedMarketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center text-emerald-600 font-medium mb-4">
              → Price (TZS) → Forecast
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">AI Price Forecast</h4>
              <p className="text-gray-700 text-sm">
                Based on historical trends and current market conditions, prices for Maize in Arusha are expected to increase by 
                approximately 10% in the next three months. Consider timing your market activities accordingly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Price Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Price</span>
              <span className="font-semibold">1,350 TZS/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Average (3m)</span>
              <span>1,425 TZS/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Highest (3m)</span>
              <span>1,600 TZS/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lowest (3m)</span>
              <span>1,150 TZS/kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volatility</span>
              <span className="text-orange-600">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default Marketplace;