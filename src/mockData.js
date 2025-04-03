// mockData.js
const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

const brands = {
  Electronics: ['Apple', 'Samsung', 'Sony', 'Bose', 'Dell'],
  Clothing: ['Nike', 'Adidas', 'Levi\'s', 'Zara', 'H&M'],
  Books: ['Penguin', 'HarperCollins', 'Simon & Schuster', 'Random House'],
  Home: ['IKEA', 'Crate & Barrel', 'Williams Sonoma', 'West Elm'],
  Sports: ['Nike', 'Adidas', 'Under Armour', 'The North Face']
};

const generateMockItems = (count = 30) => {
  const items = [];
  
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subType = {
      Electronics: ['Smartphone', 'Laptop', 'Headphones', 'Smart Watch'][Math.floor(Math.random() * 4)],
      Clothing: ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers'][Math.floor(Math.random() * 4)],
      Books: ['Novel', 'Textbook', 'Biography', 'Cookbook'][Math.floor(Math.random() * 4)],
      Home: ['Furniture', 'Lighting', 'Decor', 'Kitchenware'][Math.floor(Math.random() * 4)],
      Sports: ['Equipment', 'Apparel', 'Footwear', 'Accessories'][Math.floor(Math.random() * 4)]
    }[category];

    const brand = brands[category][Math.floor(Math.random() * brands[category].length)];

    items.push({
      id: i + 1,
      name: `${brand} ${subType}`,
      description: `Premium ${subType.toLowerCase()} by ${brand}`,
      category,
      price: (Math.random() * 500 + 10).toFixed(2),
      stock: Math.floor(Math.random() * 100),
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
    });
  }
  
  return items;
};

export const mockItems = generateMockItems();