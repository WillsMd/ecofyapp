import React, { useState } from 'react';
import { Plus, Eye, Settings, Trash2, X } from 'lucide-react';

interface Farm {
  id: number;
  name: string;
  location: string;
  size: string;
  sizeInAcres: number;
  image: string;
  soilMoisture: string;
  organicCarbon: string;
  soilTexture: string;
  soilPH: string;
  ec: string;
  salinity: string;
  waterHoldingCapacity: string;
  organicMatter: string;
  npk: string;
  crops: string[];
  latitude: string;
  longitude: string;
  topography: string;
}

const initialFarms: Farm[] = [
  {
    id: 1,
    name: 'Morogoro Farm',
    location: 'Morogoro',
    size: '5 acres',
    sizeInAcres: 5,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop',
    soilMoisture: '60%',
    organicCarbon: '2.5%',
    soilTexture: 'Loamy',
    soilPH: '6.5',
    ec: '',
    salinity: '',
    waterHoldingCapacity: '',
    organicMatter: '',
    npk: '',
    crops: ['Maize', 'Beans'],
    latitude: '-6.8235',
    longitude: '37.6822',
    topography: 'Flat to gently undulating'
  },
  {
    id: 2,
    name: 'Arusha Farm',
    location: 'Arusha',
    size: '3.5 acres',
    sizeInAcres: 3.5,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop',
    soilMoisture: '45%',
    organicCarbon: '1.8%',
    soilTexture: 'Sandy Loam',
    soilPH: '6.8',
    ec: '',
    salinity: '',
    waterHoldingCapacity: '',
    organicMatter: '',
    npk: '',
    crops: ['Coffee', 'Maize'],
    latitude: '-3.3869',
    longitude: '36.6830',
    topography: 'Rolling hills'
  },
  {
    id: 3,
    name: 'Mbeya Farm',
    location: 'Mbeya',
    size: '7 acres',
    sizeInAcres: 7,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=200&fit=crop',
    soilMoisture: '55%',
    organicCarbon: '3.2%',
    soilTexture: 'Clay Loam',
    soilPH: '6.2',
    ec: '',
    salinity: '',
    waterHoldingCapacity: '',
    organicMatter: '',
    npk: '',
    crops: ['Rice', 'Sunflower'],
    latitude: '-8.9094',
    longitude: '33.4607',
    topography: 'Flat plains'
  }
];

const Farms = () => {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [activeTab, setActiveTab] = useState('Farm Maps');
  const [editForm, setEditForm] = useState<Partial<Farm>>({});

  const handleViewFarm = (farm: Farm) => {
    setSelectedFarm(farm);
    setActiveTab('Farm Maps');
    setShowViewModal(true);
  };

  const handleEditFarm = (farm: Farm) => {
    setSelectedFarm(farm);
    setEditForm(farm);
    setShowEditModal(true);
  };

  const handleAddFarm = () => {
    setEditForm({
      name: '',
      location: '',
      sizeInAcres: 0,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=200&fit=crop',
      soilMoisture: '',
      organicCarbon: '',
      soilTexture: '',
      soilPH: '',
      crops: [],
      latitude: '',
      longitude: '',
      topography: ''
    });
    setShowAddModal(true);
  };

  const handleDeleteFarm = (farm: Farm) => {
    setSelectedFarm(farm);
    setShowDeleteModal(true);
  };

  const handleSaveFarm = () => {
    if (selectedFarm) {
      // Update existing farm
      setFarms(farms.map(farm => 
        farm.id === selectedFarm.id 
          ? { ...editForm, id: selectedFarm.id, size: `${editForm.sizeInAcres} acres` } as Farm
          : farm
      ));
    } else {
      // Add new farm
      const newFarm: Farm = {
        ...editForm,
        id: Date.now(),
        size: `${editForm.sizeInAcres} acres`
      } as Farm;
      setFarms([...farms, newFarm]);
    }
    setShowEditModal(false);
    setShowAddModal(false);
    setSelectedFarm(null);
    setEditForm({});
  };

  const handleDeleteConfirm = () => {
    if (selectedFarm) {
      setFarms(farms.filter(farm => farm.id !== selectedFarm.id));
      setShowDeleteModal(false);
      setSelectedFarm(null);
    }
  };

  const addCrop = (crop: string) => {
    if (crop && !editForm.crops?.includes(crop)) {
      setEditForm({
        ...editForm,
        crops: [...(editForm.crops || []), crop]
      });
    }
  };

  const removeCrop = (cropToRemove: string) => {
    setEditForm({
      ...editForm,
      crops: editForm.crops?.filter(crop => crop !== cropToRemove) || []
    });
  };

  const ViewModal = () => (
    showViewModal && selectedFarm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-xl font-bold">{selectedFarm.name}</h2>
              <p className="text-gray-600">{selectedFarm.location} • {selectedFarm.size}</p>
            </div>
            <button onClick={() => setShowViewModal(false)} className="p-2 hover:bg-gray-100 rounded">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex border-b">
            {['Farm Maps', 'Soil Reports', 'Resources', 'Recommendations'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium ${
                  activeTab === tab 
                    ? 'text-emerald-600 border-b-2 border-emerald-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 overflow-y-auto max-h-96">
            {activeTab === 'Farm Maps' && (
              <div>
                <div className="bg-gray-100 h-64 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-6">
                  <p className="text-gray-500">Farm map visualization</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Latitude</p>
                    <p className="font-semibold">{selectedFarm.latitude}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Longitude</p>
                    <p className="font-semibold">{selectedFarm.longitude}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Topography</p>
                    <p className="font-semibold">{selectedFarm.topography}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Soil Reports' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Soil Moisture</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedFarm.soilMoisture}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Organic Carbon</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedFarm.organicCarbon}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Soil Texture</h4>
                    <p className="text-lg font-semibold">{selectedFarm.soilTexture}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Soil pH</h4>
                    <p className="text-lg font-semibold">{selectedFarm.soilPH}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Resources' && (
              <div>
                <h4 className="font-semibold mb-4">Available Resources</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Irrigation System</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Weather Station</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Storage Facility</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Recommendations' && (
              <div>
                <h4 className="font-semibold mb-4">Agricultural Recommendations</h4>
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50">
                    <h5 className="font-semibold text-green-800">Optimal Crops</h5>
                    <p className="text-green-700">Based on soil conditions, {selectedFarm.crops.join(', ')} are recommended for this season.</p>
                  </div>
                  <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h5 className="font-semibold text-blue-800">Irrigation</h5>
                    <p className="text-blue-700">Current soil moisture is optimal. Monitor weekly and adjust irrigation accordingly.</p>
                  </div>
                  <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                    <h5 className="font-semibold text-yellow-800">Fertilization</h5>
                    <p className="text-yellow-700">Consider adding organic matter to improve soil structure and nutrient retention.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );

  const FormModal = ({ isEdit }: { isEdit: boolean }) => (
    (isEdit ? showEditModal : showAddModal) && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">{isEdit ? 'Edit Farm' : 'Add New Farm'}</h2>
            <button 
              onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)} 
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-96">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter farm name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location || ''}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size (acres)</label>
                <input
                  type="number"
                  value={editForm.sizeInAcres || ''}
                  onChange={(e) => setEditForm({ ...editForm, sizeInAcres: parseFloat(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter size in acres"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil Moisture</label>
                  <input
                    type="text"
                    value={editForm.soilMoisture || ''}
                    onChange={(e) => setEditForm({ ...editForm, soilMoisture: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 60%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organic Carbon</label>
                  <input
                    type="text"
                    value={editForm.organicCarbon || ''}
                    onChange={(e) => setEditForm({ ...editForm, organicCarbon: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 2.5%"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil Texture</label>
                  <select
                    value={editForm.soilTexture || ''}
                    onChange={(e) => setEditForm({ ...editForm, soilTexture: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Select texture</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Clay Loam">Clay Loam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                  <input
                    type="text"
                    value={editForm.soilPH || ''}
                    onChange={(e) => setEditForm({ ...editForm, soilPH: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., 6.5"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crops</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editForm.crops?.map((crop, index) => (
                    <span key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {crop}
                      <button onClick={() => removeCrop(crop)} className="text-red-500 hover:text-red-700">
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add crop"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addCrop(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 p-6 border-t">
            <button
              onClick={() => isEdit ? setShowEditModal(false) : setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveFarm}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              {isEdit ? 'Update Farm' : 'Add Farm'}
            </button>
          </div>
        </div>
      </div>
    )
  );

  const DeleteModal = () => (
    showDeleteModal && selectedFarm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-96 p-6">
          <h3 className="text-lg font-semibold mb-2">Delete Farm</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete {selectedFarm.name}? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Farms</h2>
        <button 
          onClick={handleAddFarm}
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Farm
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${farm.image})` }}
            >
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{farm.name}</h3>
                <p className="text-sm opacity-90">{farm.location}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Size</div>
                  <div className="font-semibold">{farm.size}</div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleViewFarm(farm)}
                    className="p-2 text-emerald-500 hover:bg-emerald-50 rounded transition-colors"
                    title="View farm details"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    onClick={() => handleEditFarm(farm)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    title="Edit farm"
                  >
                    <Settings size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteFarm(farm)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Delete farm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ViewModal />
      <FormModal isEdit={true} />
      <FormModal isEdit={false} />
      <DeleteModal />
    </div>
  );
};

export default Farms;