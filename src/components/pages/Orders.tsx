import { Eye } from "lucide-react";

const orders = [
  {
    id: 'ORD-001',
    date: '15/3/2024',
    total: 'TSh 8,500',
    status: 'Delivered'
  },
  {
    id: 'ORD-002',
    date: '14/3/2024',
    total: 'TSh 4,500',
    status: 'Processing'
  }
];
const Orders = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold">Order {order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">Placed on {order.date}</div>
                <div className="font-semibold mt-1">Total: {order.total}</div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Eye size={16} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
);

export default Orders;