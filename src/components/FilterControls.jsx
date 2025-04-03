import { useRef } from 'react';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports'];

const FilterControls = ({ 
  idFilter, 
  setIdFilter, 
  categoryFilter, 
  setCategoryFilter, 
  onDataUpload,
  onAddNewItem
}) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (!Array.isArray(jsonData)) throw new Error("Invalid format");
        onDataUpload(jsonData);
      } catch (error) {
        onDataUpload(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="filter-controls">
      {/* Search Bar */}
      <div className="search-row">
        <input
          type="text"
          placeholder="🔍 Search by ID or Name..."
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${categoryFilter === category ? 'active' : ''}`}
            onClick={() => setCategoryFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-row">
        <button 
          onClick={onAddNewItem}
          className="action-btn add-btn"
        >
          ➕ Add New Item
        </button>
        
        <div className="upload-container">
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileUpload}
            className="file-input"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="action-btn upload-btn">
            📁 Upload JSON
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;