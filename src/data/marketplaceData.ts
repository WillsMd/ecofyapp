import type { MarketItem, FilterOptions, ChartData } from '../types/marketplace';

export const marketItems: Record<string, MarketItem[]> = {
  'all-products': [
    {
      id: '1',
      name: 'Maize',
      price: 1200,
      unit: 'TZS/kg',
      location: 'Morogoro',
      description: 'High-quality maize grains suitable for human consumption or animal feed.',
      category: 'crops'
    },
    {
      id: '2',
      name: 'Rice',
      price: 2500,
      unit: 'TZS/kg',
      location: 'Mbeya',
      description: 'Premium rice grown in the fertile lands of Mbeya region.',
      category: 'crops'
    },
    {
      id: '3',
      name: 'Dairy Cattle',
      price: 750000,
      unit: 'TZS/head',
      location: 'Arusha',
      description: 'Healthy dairy cattle with good milk production records.',
      category: 'livestock'
    },
    {
      id: '4',
      name: 'Layer Chickens',
      price: 15000,
      unit: 'TZS/bird',
      location: 'Dar es Salaam',
      description: 'Productive layer chickens at peak egg production age.',
      category: 'poultry'
    },
    {
      id: '5',
      name: 'Cassava',
      price: 800,
      unit: 'TZS/kg',
      location: 'Dar es Salaam',
      description: 'Fresh cassava roots harvested from coastal regions of Tanzania.',
      category: 'crops'
    },
    {
      id: '6',
      name: 'Tilapia Fish',
      price: 8000,
      unit: 'TZS/kg',
      location: 'Mwanza',
      description: 'Fresh tilapia fish from Lake Victoria.',
      category: 'fisheries'
    },
    {
      id: '7',
      name: 'Maize Seeds',
      price: 5000,
      unit: 'TZS/kg',
      location: 'Arusha',
      description: 'Certified hybrid maize seeds with high yield potential.',
      category: 'seeds'
    },
    {
      id: '8',
      name: 'NPK Fertilizer',
      price: 80000,
      unit: 'TZS/bag',
      location: 'Dar es Salaam',
      description: 'Balanced NPK fertilizer for crop nutrition.',
      category: 'fertilizers'
    },
    {
      id: '9',
      name: 'Tractor',
      price: 25000000,
      unit: 'TZS/unit',
      location: 'Arusha',
      description: 'Small-scale farming tractor suitable for various field operations.',
      category: 'equipment'
    }
  ],
  'crops': [
    {
      id: '1',
      name: 'Maize',
      price: 1200,
      unit: 'TZS/kg',
      location: 'Morogoro',
      description: 'High-quality maize grains suitable for human consumption or animal feed.',
      category: 'crops'
    },
    {
      id: '2',
      name: 'Rice',
      price: 2500,
      unit: 'TZS/kg',
      location: 'Mbeya',
      description: 'Premium rice grown in the fertile lands of Mbeya region.',
      category: 'crops'
    },
    {
      id: '5',
      name: 'Cassava',
      price: 800,
      unit: 'TZS/kg',
      location: 'Dar es Salaam',
      description: 'Fresh cassava roots harvested from coastal regions of Tanzania.',
      category: 'crops'
    }
  ],
  'livestock': [
    {
      id: '3',
      name: 'Dairy Cattle',
      price: 750000,
      unit: 'TZS/head',
      location: 'Arusha',
      description: 'Healthy dairy cattle with good milk production records.',
      category: 'livestock'
    },
    {
      id: '10',
      name: 'Goats',
      price: 150000,
      unit: 'TZS/head',
      location: 'Dodoma',
      description: 'Hardy goats suitable for meat and milk production.',
      category: 'livestock'
    }
  ],
  'poultry': [
    {
      id: '4',
      name: 'Layer Chickens',
      price: 15000,
      unit: 'TZS/bird',
      location: 'Dar es Salaam',
      description: 'Productive layer chickens at peak egg production age.',
      category: 'poultry'
    },
    {
      id: '11',
      name: 'Broiler Chickens',
      price: 12000,
      unit: 'TZS/bird',
      location: 'Arusha',
      description: 'Fast-growing broiler chickens ready for market.',
      category: 'poultry'
    }
  ],
  'fisheries': [
    {
      id: '6',
      name: 'Tilapia Fish',
      price: 8000,
      unit: 'TZS/kg',
      location: 'Mwanza',
      description: 'Fresh tilapia fish from Lake Victoria.',
      category: 'fisheries'
    },
    {
      id: '12',
      name: 'Catfish',
      price: 10000,
      unit: 'TZS/kg',
      location: 'Morogoro',
      description: 'Farm-raised catfish with excellent taste.',
      category: 'fisheries'
    }
  ],
  'seeds': [
    {
      id: '7',
      name: 'Maize Seeds',
      price: 5000,
      unit: 'TZS/kg',
      location: 'Arusha',
      description: 'Certified hybrid maize seeds with high yield potential.',
      category: 'seeds'
    },
    {
      id: '13',
      name: 'Rice Seeds',
      price: 7000,
      unit: 'TZS/kg',
      location: 'Mbeya',
      description: 'High-quality rice seeds for paddy cultivation.',
      category: 'seeds'
    }
  ],
  'fertilizers': [
    {
      id: '8',
      name: 'NPK Fertilizer',
      price: 80000,
      unit: 'TZS/bag',
      location: 'Dar es Salaam',
      description: 'Balanced NPK fertilizer for crop nutrition.',
      category: 'fertilizers'
    },
    {
      id: '14',
      name: 'Urea Fertilizer',
      price: 75000,
      unit: 'TZS/bag',
      location: 'Arusha',
      description: 'Nitrogen-rich urea fertilizer for enhanced crop growth.',
      category: 'fertilizers'
    }
  ],
  'equipment': [
    {
      id: '9',
      name: 'Tractor',
      price: 25000000,
      unit: 'TZS/unit',
      location: 'Arusha',
      description: 'Small-scale farming tractor suitable for various field operations.',
      category: 'equipment'
    },
    {
      id: '15',
      name: 'Water Pump',
      price: 500000,
      unit: 'TZS/unit',
      location: 'Dar es Salaam',
      description: 'Efficient water pump for irrigation systems.',
      category: 'equipment'
    }
  ]
};

export const filterOptions: Record<string, FilterOptions> = {
  'all-products': {
    location: ['All Locations', 'Arusha', 'Morogoro', 'Mbeya', 'Dar es Salaam', 'Mwanza', 'Dodoma'],
    category: ['All Categories', 'Crops', 'Livestock', 'Poultry', 'Fisheries', 'Seeds', 'Fertilizers', 'Equipment'],
    unit: ['All Units', 'TZS/kg', 'TZS/head', 'TZS/bird', 'TZS/bag', 'TZS/unit'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'crops': {
    location: ['All Locations', 'Arusha', 'Morogoro', 'Mbeya', 'Dar es Salaam'],
    product: ['All Crops', 'Maize', 'Rice', 'Cassava', 'Beans', 'Wheat'],
    unit: ['All Units', 'TZS/kg', 'TZS/bag'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'livestock': {
    location: ['All Locations', 'Arusha', 'Dodoma', 'Mbeya', 'Iringa'],
    product: ['All Livestock', 'Dairy Cattle', 'Beef Cattle', 'Goats', 'Sheep'],
    unit: ['All Units', 'TZS/head'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'poultry': {
    location: ['All Locations', 'Dar es Salaam', 'Arusha', 'Morogoro', 'Mwanza'],
    product: ['All Poultry', 'Layer Chickens', 'Broiler Chickens', 'Ducks', 'Turkeys'],
    unit: ['All Units', 'TZS/bird', 'TZS/dozen'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'fisheries': {
    location: ['All Locations', 'Mwanza', 'Dar es Salaam', 'Morogoro', 'Pwani'],
    product: ['All Fish', 'Tilapia', 'Catfish', 'Sardines', 'Tuna'],
    unit: ['All Units', 'TZS/kg', 'TZS/piece'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'seeds': {
    location: ['All Locations', 'Arusha', 'Mbeya', 'Morogoro', 'Iringa'],
    product: ['All Seeds', 'Maize Seeds', 'Rice Seeds', 'Bean Seeds', 'Vegetable Seeds'],
    unit: ['All Units', 'TZS/kg', 'TZS/packet'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'fertilizers': {
    location: ['All Locations', 'Dar es Salaam', 'Arusha', 'Mbeya', 'Morogoro'],
    product: ['All Fertilizers', 'NPK', 'Urea', 'DAP', 'Organic Fertilizer'],
    unit: ['All Units', 'TZS/bag', 'TZS/kg'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  },
  'equipment': {
    location: ['All Locations', 'Arusha', 'Dar es Salaam', 'Mbeya', 'Morogoro'],
    product: ['All Equipment', 'Tractors', 'Pumps', 'Harvesters', 'Hand Tools'],
    unit: ['All Units', 'TZS/unit', 'TZS/set'],
    timePeriod: ['3 Months', '6 Months', '1 Year']
  }
};

export const chartData: ChartData[] = [
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