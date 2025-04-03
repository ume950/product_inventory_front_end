import { useState } from 'react';
import { mockItems } from '../mockData';
import ItemTable from '../components/ItemTable';
import FilterControls from '../components/FilterControls';

const LandingPage = () => {
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState(mockItems);

  const filteredItems = items.filter(item => 
    JSON.stringify(item).toLowerCase().includes(filter.toLowerCase())
  );

  const handleDataUpload = (uploadedData) => {
    const validItems = uploadedData.filter(item => 
      item.name && item.category && !isNaN(item.price) && !isNaN(item.stock)
    );
    
    if (validItems.length !== uploadedData.length) {
      alert(`${uploadedData.length - validItems.length} invalid items were skipped`);
    }

    const newItems = validItems.map((item, index) => ({
      ...item,
      id: Math.max(0, ...items.map(i => i.id)) + index + 1,
      price: Number(item.price).toFixed(2),
      stock: Math.floor(Number(item.stock))
    }));

    setItems([...items, ...newItems]);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAdd = (newItem) => {
    setItems([...items, { 
      ...newItem, 
      id: Math.max(0, ...items.map(i => i.id)) + 1 
    }]);
  };

  const handleUpdate = (updatedItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? { 
        ...updatedItem,
        price: Number(updatedItem.price).toFixed(2),
        stock: Math.floor(Number(updatedItem.stock))
      } : item
    ));
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Product Inventory Dashboard</h1>
        <p>Total Items: {items.length} | Filtered: {filteredItems.length}</p>
      </header>
      
      <FilterControls 
        filter={filter} 
        setFilter={setFilter}
        onDataUpload={handleDataUpload}
      />
      
      <ItemTable 
        items={filteredItems} 
        onDelete={handleDelete}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default LandingPage;