// Demo data for restaurants and menus
const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Manek Chowk Treats',
    cuisine: 'Gujarati',
    rating: 4.6,
    eta: '25-35 min',
    image: 'https://images.unsplash.com/photo-1625944527949-929f4bc1b8a6?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1625944590029-0a4d7aa90bf5?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'r2',
    name: 'Law Garden Snacks',
    cuisine: 'Fast Food',
    rating: 4.4,
    eta: '20-30 min',
    image: 'https://images.unsplash.com/photo-1543352634-8730f16cf9a6?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1550547660-20bf0937a83d?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'r3',
    name: 'CG Road Farsan House',
    cuisine: 'Gujarati',
    rating: 4.8,
    eta: '30-40 min',
    image: 'https://images.unsplash.com/photo-1589308078055-918dc4b00a3d?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'r4',
    name: 'Usmanpura Burgers',
    cuisine: 'Fast Food',
    rating: 4.3,
    eta: '15-25 min',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'r5',
    name: 'Navrangpura Thali',
    cuisine: 'Gujarati',
    rating: 4.5,
    eta: '20-30 min',
    image: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1522184216315-1b0a2c0a2c8e?q=80&w=1600&auto=format&fit=crop'
  },
  {
    id: 'r6',
    name: 'Vastrapur Bites',
    cuisine: 'Fast Food',
    rating: 4.2,
    eta: '25-35 min',
    image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1200&auto=format&fit=crop',
    banner: 'https://images.unsplash.com/photo-1601924582971-b1bf94b9c564?q=80&w=1600&auto=format&fit=crop'
  }
];

const MENUS = {
  r1: [
    { id: 'r1-m1', name: 'Khaman Dhokla', price: 120, desc: 'Soft steamed gram flour cakes with tadka', image: 'https://images.unsplash.com/photo-1617889960414-1cf3a8036f2b?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r1-m2', name: 'Fafda Jalebi', price: 140, desc: 'Crispy fafda with sweet jalebi combo', image: 'https://images.unsplash.com/photo-1625944705101-e5a8c2c5a8b6?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r1-m3', name: 'Sev Usal', price: 110, desc: 'Spicy white peas curry topped with sev', image: 'https://images.unsplash.com/photo-1625944570011-3e6d6a2a1a9c?q=80&w=1200&auto=format&fit=crop' }
  ],
  r2: [
    { id: 'r2-m1', name: 'Vada Pav', price: 60, desc: 'Mumbai style vada pav with chutneys', image: 'https://images.unsplash.com/photo-1625944703115-0d9f1e6df2e7?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r2-m2', name: 'Cheese Puff', price: 45, desc: 'Flaky puff pastry with cheese filling', image: 'https://images.unsplash.com/photo-1519242220834-59d3c4386a86?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r2-m3', name: 'Masala Sandwich', price: 90, desc: 'Spiced veggies sandwich toasted to crisp', image: 'https://images.unsplash.com/photo-1550317137-4d7d4f7c4f38?q=80&w=1200&auto=format&fit=crop' }
  ],
  r3: [
    { id: 'r3-m1', name: 'Undhiyu', price: 220, desc: 'Mixed winter veggies cooked with spices', image: 'https://images.unsplash.com/photo-1604908553962-3f9b47a03287?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r3-m2', name: 'Thepla', price: 80, desc: 'Gujarati methi thepla with pickle', image: 'https://images.unsplash.com/photo-1625944744331-07b5a6a9c3b4?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r3-m3', name: 'Handvo', price: 150, desc: 'Savory lentil cake tempered with sesame', image: 'https://images.unsplash.com/photo-1625944769977-2a2a6a7d0e10?q=80&w=1200&auto=format&fit=crop' }
  ],
  r4: [
    { id: 'r4-m1', name: 'Cheese Burger', price: 160, desc: 'Grilled patty with cheddar and sauces', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r4-m2', name: 'Loaded Fries', price: 120, desc: 'Fries with cheese and masala', image: 'https://images.unsplash.com/photo-1550450005-5ec0b0f1a9d1?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r4-m3', name: 'Chocolate Shake', price: 130, desc: 'Thick shake with cocoa and ice cream', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1200&auto=format&fit=crop' }
  ],
  r5: [
    { id: 'r5-m1', name: 'Gujarati Thali', price: 280, desc: 'Assorted sabzis, dal, roti, rice & sweets', image: 'https://images.unsplash.com/photo-1559060017-1314b7f8c664?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r5-m2', name: 'Kadhi Khichdi', price: 150, desc: 'Comforting khichdi with kadhi', image: 'https://images.unsplash.com/photo-1625944730435-1f5e5b3a2f8d?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r5-m3', name: 'Shrikhand', price: 110, desc: 'Sweet hung-curd dessert with saffron', image: 'https://images.unsplash.com/photo-1604908380037-4c5c2f0e0c5e?q=80&w=1200&auto=format&fit=crop' }
  ],
  r6: [
    { id: 'r6-m1', name: 'Dabeli', price: 50, desc: 'Kutchi dabeli stuffed with masala peanuts', image: 'https://images.unsplash.com/photo-1655632506966-8f9b1f1b1ad0?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r6-m2', name: 'Cheese Pizza Slice', price: 120, desc: 'Classic slice with mozzarella', image: 'https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r6-m3', name: 'Paneer Tikka Roll', price: 140, desc: 'Spicy paneer tikka wrapped in rumali', image: 'https://images.unsplash.com/photo-1576402187872-69a9e6182b1e?q=80&w=1200&auto=format&fit=crop' }
  ]
};


