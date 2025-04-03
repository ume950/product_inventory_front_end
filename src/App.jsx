import { useState, useEffect } from 'react';
import { mockItems } from './mockData';
import FilterControls from './components/FilterControls';
import ItemTable from './components/ItemTable';
import './styles/main.css';

function App() {
  const [idFilter, setIdFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('inventoryItems');
    return savedItems ? JSON.parse(savedItems) : mockItems;
  });
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
  }, [items]);

  const filteredItems = items.filter(item => {
    const categoryMatch = categoryFilter === 'All' || item.category === categoryFilter;
    const searchMatch = 
      !idFilter ||  
      item.id.toString().toLowerCase().includes(idFilter.toLowerCase()) ||  
      item.name.toLowerCase().includes(idFilter.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleDataUpload = (uploadedData) => {
    try {
      const validItems = uploadedData.filter(item => 
        item.name && item.category && !isNaN(item.price) && !isNaN(item.stock)
      );
      
      if (validItems.length !== uploadedData.length) {
        setUploadMessage(`Uploaded - ${uploadedData.length - validItems.length} invalid items skipped`);
        setUploadStatus('warning');
      } else {
        setUploadMessage('File uploaded successfully!');
        setUploadStatus('success');
      }

      const newItems = validItems.map((item, index) => ({
        ...item,
        id: Math.max(0, ...items.map(i => i.id)) + index + 1,
        price: Number(item.price).toFixed(2),
        stock: Math.floor(Number(item.stock))
      }));

      setItems([...items, ...newItems]);
      
      setTimeout(() => {
        setUploadMessage('');
        setUploadStatus('');
      }, 3000);

    } catch (error) {
      setUploadMessage('Error: Invalid file format. Upload a valid JSON array.');
      setUploadStatus('error');
      setTimeout(() => {
        setUploadMessage('');
        setUploadStatus('');
      }, 3000);
    }
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAdd = (newItem) => {
    setItems(prevItems => {
      const newId = prevItems.length > 0 ? Math.max(...prevItems.map(i => i.id)) + 1 : 1;
      return [
        ...prevItems,
        {
          ...newItem,
          id: newId,
          price: Number(newItem.price).toFixed(2),
          stock: Math.floor(Number(newItem.stock))
        }
      ];
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleUpdate = (updatedItem) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === updatedItem.id ? {
          ...updatedItem,
          id: updatedItem.id,
          price: Number(updatedItem.price).toFixed(2),
          stock: Math.floor(Number(updatedItem.stock))
        } : item
      )
    );
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Product Inventory Dashboard</h1>
        <p>Total Items: {items.length} | Showing: {filteredItems.length}</p>
      </header>
      
      <FilterControls  
        idFilter={idFilter}
        setIdFilter={setIdFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onDataUpload={handleDataUpload}
        onAddNewItem={() => {
          setEditingItem(null);
          setShowForm(true);
        }}
      />
      
      {uploadMessage && (
        <div className={`upload-message ${uploadStatus}`}>
          {uploadMessage}
        </div>
      )}
      
      <ItemTable  
        items={filteredItems}  
        onDelete={handleDelete}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </div>
  );
}

export default App;