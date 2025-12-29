// Demo data for restaurants and menus
const RESTAURANTS = [
  {
    id: 'r1',
    name: 'Manek Chowk Treats',
    cuisine: 'Gujarati',
    rating: 4.6,
    eta: '25-35 min',
    image: 'https://ahmedabadtourism.in/images//tourist-places/manek-chowk-ahmedabad/manek-chowk-ahmedabad-india-tourism-history.jpg',
    banner: 'https://ahmedabadtourism.in/images//tourist-places/manek-chowk-ahmedabad/manek-chowk-ahmedabad-india-tourism-history.jpg'
  },
  {
    id: 'r2',
    name: 'Law Garden Snacks',
    cuisine: 'Fast Food',
    rating: 4.4,
    eta: '20-30 min',
    image: 'https://www.mericity.com/MeriCityMedia/Business/383/Swati_Snacks_Ahmedabad_MeriCity_383_0.jpg',
    banner: 'https://www.mericity.com/MeriCityMedia/Business/383/Swati_Snacks_Ahmedabad_MeriCity_383_0.jpg'
  },
  {
    id: 'r3',
    name: 'CG Road Farsan House',
    cuisine: 'Gujarati',
    rating: 4.8,
    eta: '30-40 min',
    image: 'https://content3.jdmagicbox.com/comp/ahmedabad/j8/079pxx79.xx79.130403163942.u3j8/catalogue/jay-shiv-shambhu-snacks-and-coffee-bar-law-garden-ahmedabad-fast-food-61nx9rk3k1.jpg',
    banner: 'https://content3.jdmagicbox.com/comp/ahmedabad/j8/079pxx79.xx79.130403163942.u3j8/catalogue/jay-shiv-shambhu-snacks-and-coffee-bar-law-garden-ahmedabad-fast-food-61nx9rk3k1.jpg'
  },
  {
    id: 'r4',
    name: 'Usmanpura Burgers',
    cuisine: 'Fast Food',
    rating: 4.3,
    eta: '15-25 min',
    image: 'https://content.jdmagicbox.com/v2/comp/ahmedabad/w9/079pxx79.xx79.250417221620.u6w9/catalogue/the-burger-tag-memnagar-ahmedabad-food-court-vq2oatbfea.jpg',
    banner: 'https://content.jdmagicbox.com/v2/comp/ahmedabad/w9/079pxx79.xx79.250417221620.u6w9/catalogue/the-burger-tag-memnagar-ahmedabad-food-court-vq2oatbfea.jpg'
  },
  {
    id: 'r5',
    name: 'Navrangpura Thali',
    cuisine: 'Gujarati',
    rating: 4.5,
    eta: '20-30 min',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXPQ7Pr0Ae-DsfTM8-XVOzfzicX9ay2KfsQ&s',
    banner: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkXPQ7Pr0Ae-DsfTM8-XVOzfzicX9ay2KfsQ&s'
  },
  {
    id: 'r6',
    name: 'Vastrapur Bites',
    cuisine: 'Fast Food',
    rating: 4.2,
    eta: '25-35 min',
    image: 'https://content.jdmagicbox.com/comp/def_content_category/tasty-bites/164302834-5288409871200683-1266264266826887210-n-tasty-bites-1-4myq0-250.jpg',
    banner: 'https://content.jdmagicbox.com/comp/def_content_category/tasty-bites/164302834-5288409871200683-1266264266826887210-n-tasty-bites-1-4myq0-250.jpg'
  }
];

const MENUS = {
  r1: [
    { id: 'r1-m1', name: 'Khaman Dhokla', price: 120, desc: 'Soft steamed gram flour cakes with tadka', image: 'https://c.ndtvimg.com/2025-07/vupbjb7k_food_625x300_09_July_25.jpg' },
    { id: 'r1-m2', name: 'Fafda Jalebi', price: 140, desc: 'Crispy fafda with sweet jalebi combo', image: 'https://images.timesnownews.com/thumb/msid-115693016,width-1280,height-720,resizemode-75/115693016.jpg' },
    { id: 'r1-m3', name: 'Sev Usal', price: 110, desc: 'Spicy white peas curry topped with sev', image: 'https://img-global.cpcdn.com/recipes/0e0c53dec8604c33/1200x630cq80/photo.jpg' }
  ],
  r2: [
    { id: 'r2-m1', name: 'Vada Pav', price: 60, desc: 'Mumbai style vada pav with chutneys', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCB5lc59gEii_Ma28zbsCvFplkLfeqbf94fw&s' },
    { id: 'r2-m2', name: 'Cheese Puff', price: 45, desc: 'Flaky puff pastry with cheese filling', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQ5VAcK_6GIhjPLrBpBRjEF1T8n4dCAZmkA&s' },
    { id: 'r2-m3', name: 'Masala Sandwich', price: 90, desc: 'Spiced veggies sandwich toasted to crisp', image: 'https://vaya.in/recipes/wp-content/uploads/2019/02/Masala-Sandwich.jpg' }
  ],
  r3: [
    { id: 'r3-m1', name: 'Undhiyu', price: 220, desc: 'Mixed winter veggies cooked with spices', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4fK103aLdblEnMxOXDnkikrGi1TOKFtDl_g&s' },
    { id: 'r3-m2', name: 'Thepla', price: 80, desc: 'Gujarati methi thepla with pickle', image: 'https://rakskitchen.net/wp-content/uploads/2009/05/methi-thepla.jpg' },
    { id: 'r3-m3', name: 'Handvo', price: 150, desc: 'Savory lentil cake tempered with sesame', image: 'https://stahlkitchens.com/cdn/shop/articles/Gujarati_Tawa_Handvo_eff76281-e523-4203-bded-1a695527f31a_grande.png?v=1762857274' }
  ],
  r4: [
    { id: 'r4-m1', name: 'Cheese Burger', price: 160, desc: 'Grilled patty with cheddar and sauces', image: 'https://bakersway.in/cdn/shop/files/cheese-burger.png?v=1715063611' },
    { id: 'r4-m2', name: 'Loaded Fries', price: 120, desc: 'Fries with cheese and masala', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOidhYKOEHCcg6ydoFx5oGwnBmoSWW0eqQ7w&s' },
    { id: 'r4-m3', name: 'Chocolate Shake', price: 130, desc: 'Thick shake with cocoa and ice cream', image: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltd2f0b951708bdfce/66707638b76a9292bd908d6f/chocolate-truffle-featured-image.jpg?q=70&width=3840&auto=webp' }
  ],
  r5: [
    { id: 'r5-m1', name: 'Gujarati Thali', price: 280, desc: 'Assorted sabzis, dal, roti, rice & sweets', image: 'https://www.gujaratexpert.com/blog/wp-content/uploads/2024/01/Gujarati-Thali.jpg' },
    { id: 'r5-m2', name: 'Kadhi Khichdi', price: 150, desc: 'Comforting khichdi with kadhi', image: 'https://werecipes.com/app/uploads/2014/05/gujarati-khichdi-recipe-gujarati-khichdi.jpg' },
    { id: 'r5-m3', name: 'Shrikhand', price: 110, desc: 'Sweet hung-curd dessert with saffron', image: 'https://prashantcorner.com/cdn/shop/files/Kesar_Badam_Shrikhand_-1.jpg?v=1718180042&width=1946' }
  ],
  r6: [
    { id: 'r6-m1', name: 'Dabeli', price: 50, desc: 'Kutchi dabeli stuffed with masala peanuts', image: 'https://foodiesterminal.com/wp-content/uploads/2018/11/kutchi-dabeli-recipe-500x500.jpg' },
    { id: 'r6-m2', name: 'Cheese Pizza', price: 120, desc: 'Classic slice with mozzarella', image: 'https://www.recipetineats.com/uploads/2023/05/Garlic-cheese-pizza_9.jpg' },
    { id: 'r6-m3', name: 'Paneer Tikka Roll', price: 140, desc: 'Spicy paneer tikka wrapped in rumali', image: 'https://www.foodandwine.com/thmb/hvnI7RURjp3PZ_UqnwlZuYie5Y8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/masala-paneer-kathi-rolls-FT-RECIPE0520-1-e51be7861c5042b787dad72fbdeee931.jpg' }
  ]
};


