import React, { useEffect , useState } from 'react';
import Modal from 'react-modal';
import './Products.css';

const Products = ({ productsData, setProductsData }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement('#root');
  }, []);

  const handleDeleteProduct = (productId) => {
    // Update the productsData state by filtering out the deleted product
    setProductsData((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleAddProduct = () => {

    // Check empty fields
    if (!newProduct.name || !newProduct.category || newProduct.price === '' || newProduct.stock === '') {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Check if price or stock is negative
    if (newProduct.price < 0 || newProduct.stock < 0) {
      alert('Price and stock quantity cannot be negative.');
      return;
    }

    // Update the productsData state by adding the new product
    setProductsData((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1, ...newProduct },
    ]);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setAddModalOpen(false);
  };

  const handleEditProduct = () => {

    // Check empty fields 
    if (!editingProduct.name || !editingProduct.category || editingProduct.price === '' || editingProduct.stock === '') {
      alert('Please fill in all required fields.');
      return;
    }
  
    // Check if price or stock is negative
    if (editingProduct.price < 0 || editingProduct.stock < 0) {
      alert('Price and stock quantity cannot be negative.');
      return;
    }

    // Update the productsData state by mapping over the products and updating the edited product
    setProductsData((prevProducts) =>
      prevProducts.map((product) => (product.id === editingProduct.id ? editingProduct : product))
    );
    setEditingProduct(null);
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditModalOpen(false);
  };

  return (
    <div className='container'>
      <h2>Products Management</h2>

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
        contentLabel="Add Product Modal"
        className="modal"
      >
        <h3>Add Product</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
          />
        </div>
        <div className="form-buttons">
          <button className='add' onClick={handleAddProduct}>Add Product</button>
          <button className='cancel' onClick={() => setAddModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit Product Modal"
        className="modal"
      >
        <h3>Edit Product</h3>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editingProduct ? editingProduct.name : ''}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={editingProduct ? editingProduct.category : ''}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                category: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={editingProduct ? editingProduct.price : ''}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: Number(e.target.value),
              })
            }
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={editingProduct ? editingProduct.stock : ''}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                stock: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="form-buttons">
          <button className='add' onClick={handleEditProduct}>Save Changes</button>
          <button className='cancel' onClick={handleCancelEdit}>Cancel</button>
        </div>
      </Modal>

      <div className="action-buttons">
        <button onClick={() => setAddModalOpen(true)}>Add Product</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="edit-button" onClick={() => { setEditingProduct(product); setEditModalOpen(true); }}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
