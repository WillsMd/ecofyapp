import React from 'react';
import { 
  TrendingUp,
  BarChart3,
  AlertTriangle,
  MapPin,
  Cloud
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Mock data    
const marketData = [
  { month: 'Jan', price: 1000 },
  { month: 'Feb', price: 1200 },
  { month: 'Mar', price: 1150 },
  { month: 'Apr', price: 1300 },
  { month: 'May', price: 1350 },
  { month: 'Jun', price: 1400 },
  { month: 'Jul', price: 1450 },
  { month: 'Aug', price: 1500 }
];

interface DashboardProps {
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ selectedCrop, setSelectedCrop }) => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <select 
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option>Maize</option>
          <option>Rice</option>
          <option>Wheat</option>
        </select>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-emerald-600">{selectedCrop}</h3>
            <p className="text-gray-600">A staple crop in Tanzania, grown in various regions with good yield potential.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Optimal Planting Time</div>
            <div className="font-semibold">March - April</div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <TrendingUp size={16} />
            Market Intelligence
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
            <BarChart3 size={16} />
            Soil Insights
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
            <AlertTriangle size={16} />
            Risks
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
            <MapPin size={16} />
            Suitable Areas
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2">
            <Cloud size={16} />
            Climate Type
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-emerald-500" size={20} />
            <h4 className="font-semibold">Market Intelligence: {selectedCrop}</h4>
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center text-emerald-600 font-medium mb-4">
            → Price (TZS/kg)
          </div>

          <div className="bg-white rounded-lg p-4">
            <h5 className="font-semibold text-emerald-600 mb-2">AI Recommendation</h5>
            <p className="text-gray-700">
              Current market trends suggest optimal selling period will be in August. Consider storing your harvest until then for maximum profit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;