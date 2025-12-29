// Server-side copy of data used by the frontend
export const RESTAURANTS = [
  { id: 'r1', name: 'Manek Chowk Treats', cuisine: 'Gujarati', rating: 4.6, eta: '25-35 min', image: 'https://images.unsplash.com/photo-1625944527949-929f4bc1b8a6?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1601050690117-94f3aa3d2b3a?q=80&w=1600&auto=format&fit=crop' },
  { id: 'r2', name: 'Law Garden Snacks', cuisine: 'Fast Food', rating: 4.4, eta: '20-30 min', image: 'https://images.unsplash.com/photo-1543352634-8730f16cf9a6?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1600&auto=format&fit=crop' },
  { id: 'r3', name: 'CG Road Farsan House', cuisine: 'Gujarati', rating: 4.8, eta: '30-40 min', image: 'https://images.unsplash.com/photo-1589308078055-918dc4b00a3d?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop' },
  { id: 'r4', name: 'Usmanpura Burgers', cuisine: 'Fast Food', rating: 4.3, eta: '15-25 min', image: 'https://images.unsplash.com/photo-1550547660-20bf0937a83d?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1551782450-17144c3a09b7?q=80&w=1600&auto=format&fit=crop' },
  { id: 'r5', name: 'Navrangpura Thali', cuisine: 'Gujarati', rating: 4.5, eta: '20-30 min', image: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1522184216315-1b0a2c0a2c8e?q=80&w=1600&auto=format&fit=crop' },
  { id: 'r6', name: 'Vastrapur Bites', cuisine: 'Fast Food', rating: 4.2, eta: '25-35 min', image: 'https://images.unsplash.com/photo-1548940740-204726a19be3?q=80&w=1200&auto=format&fit=crop', banner: 'https://images.unsplash.com/photo-1601924582971-b1bf94b9c564?q=80&w=1600&auto=format&fit=crop' }
];

export const MENUS = {
  r1: [
    { id: 'r1-m1', name: 'Khaman Dhokla', price: 120, desc: 'Soft steamed gram flour cakes with tadka', image: 'https://images.unsplash.com/photo-1655632519040-2ab0d7a0f2a3?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r1-m2', name: 'Fafda Jalebi', price: 140, desc: 'Crispy fafda with sweet jalebi combo', image: 'https://images.unsplash.com/photo-1625944667030-fdcfa8c21a28?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r1-m3', name: 'Sev Usal', price: 110, desc: 'Spicy white peas curry topped with sev', image: 'https://images.unsplash.com/photo-1625944615510-6c4c0b9f7d39?q=80&w=1200&auto=format&fit=crop' }
  ],
  r2: [
    { id: 'r2-m1', name: 'Vada Pav', price: 60, desc: 'Mumbai style vada pav with chutneys', image: 'https://images.unsplash.com/photo-1601050690117-94f3aa3d2b3a?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r2-m2', name: 'Cheese Puff', price: 45, desc: 'Flaky puff pastry with cheese filling', image: 'https://images.unsplash.com/photo-1528759711373-8b34f05a2a1e?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r2-m3', name: 'Masala Sandwich', price: 90, desc: 'Spiced veggies sandwich toasted to crisp', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop' }
  ],
  r3: [
    { id: 'r3-m1', name: 'Undhiyu', price: 220, desc: 'Mixed winter veggies cooked with spices', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r3-m2', name: 'Thepla', price: 80, desc: 'Gujarati methi thepla with pickle', image: 'https://images.unsplash.com/photo-1631452180519-ef6b079f8c3d?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r3-m3', name: 'Handvo', price: 150, desc: 'Savory lentil cake tempered with sesame', image: 'https://images.unsplash.com/photo-1655632560807-6d7e02bb3d06?q=80&w=1200&auto=format&fit=crop' }
  ],
  r4: [
    { id: 'r4-m1', name: 'Cheese Burger', price: 160, desc: 'Grilled patty with cheddar and sauces', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r4-m2', name: 'Loaded Fries', price: 120, desc: 'Fries with cheese and masala', image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r4-m3', name: 'Chocolate Shake', price: 130, desc: 'Thick shake with cocoa and ice cream', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop' }
  ],
  r5: [
    { id: 'r5-m1', name: 'Gujarati Thali', price: 280, desc: 'Assorted sabzis, dal, roti, rice & sweets', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r5-m2', name: 'Kadhi Khichdi', price: 150, desc: 'Comforting khichdi with kadhi', image: 'https://images.unsplash.com/photo-1613478223719-5f89bd540139?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r5-m3', name: 'Shrikhand', price: 110, desc: 'Sweet hung-curd dessert with saffron', image: 'https://images.unsplash.com/photo-1625944390201-8458f6a8a0a8?q=80&w=1200&auto=format&fit=crop' }
  ],
  r6: [
    { id: 'r6-m1', name: 'Dabeli', price: 50, desc: 'Kutchi dabeli stuffed with masala peanuts', image: 'https://images.unsplash.com/photo-1655632499109-0b1aee2f2c63?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r6-m2', name: 'Cheese Pizza Slice', price: 120, desc: 'Classic slice with mozzarella', image: 'https://images.unsplash.com/photo-1548365328-9f547fb095f4?q=80&w=1200&auto=format&fit=crop' },
    { id: 'r6-m3', name: 'Paneer Tikka Roll', price: 140, desc: 'Spicy paneer tikka wrapped in rumali', image: 'https://images.unsplash.com/photo-1617195737492-dc2c8af9ce0a?q=80&w=1200&auto=format&fit=crop' }
  ]
};


