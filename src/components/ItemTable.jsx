import ItemForm from './ItemForm';

const ItemTable = ({ 
  items, 
  onDelete, 
  onAdd,
  onUpdate,
  editingItem,
  setEditingItem,
  showForm,
  setShowForm
}) => {
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      onUpdate({
        ...formData,
        id: editingItem.id
      });
    } else {
      onAdd(formData);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div className="item-tables">
      {showForm && (
        <ItemForm 
          item={editingItem}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(null);
          }}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={item.stock < 5 ? 'low-stock' : ''}>
                <td>{item.id}</td>
                <td className="name-cell">{item.name}</td>
                <td>
                  <span className="category-icon">
                    {item.category === 'Electronics' ? '📱' :
                     item.category === 'Clothing' ? '👕' :
                     item.category === 'Books' ? '📚' :
                     item.category === 'Home' ? '🏠' : '⚽'}
                  </span>
                  {item.category}
                </td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>
                  {item.stock}
                  {item.stock < 5 && <span className="stock-warning">⚠️</span>}
                </td>
                <td className="actions-cell">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemTable;