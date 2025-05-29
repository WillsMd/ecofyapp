import { 
  Play,
  Search
} from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: 'Maize Pest Control',
    description: 'Learn how to identify and control common pests that affect maize crops in Tanzania.',
    duration: '10 min',
    category: 'Maize',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'Proper Rice Planting Techniques',
    description: 'Master the proper techniques for planting rice to maximize yield and minimize water usage.',
    duration: '15 min',
    category: 'Rice',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'Sustainable Cattle Farming',
    description: 'Learn sustainable practices for cattle farming that improve productivity while protecting the environment.',
    duration: '20 min',
    category: 'Cattle',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=200&fit=crop'
  }
];
const Resources = () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
      
      <div className="flex gap-4 mb-6">
        <button className="bg-emerald-500 text-white px-6 py-2 rounded-lg">
          Tutorials
        </button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">
          Events
        </button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">
          AI Business Plan
        </button>
        <button className="border border-gray-300 px-6 py-2 rounded-lg">
          Books
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>All Products</option>
            <option>Maize</option>
            <option>Rice</option>
            <option>Cattle</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${tutorial.image})` }}
            >
              <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Play className="text-white ml-1" size={24} />
                </div>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{tutorial.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{tutorial.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>⏱ {tutorial.duration}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  tutorial.category === 'Maize' ? 'bg-emerald-100 text-emerald-600' :
                  tutorial.category === 'Rice' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {tutorial.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

export default Resources;