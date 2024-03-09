import React, { useState } from 'react';
import Modal from 'react-modal';
import initialProducts from './productData';
import './Products.css';

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleAddProduct = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: prevProducts.length + 1, ...newProduct },
    ]);
    setNewProduct({ name: '', category: '', price: 0, stock: 0 });
    setAddModalOpen(false);
  };

  const handleEditProduct = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
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

      {/* Add Product Modal */}
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
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={() => setAddModalOpen(false)}>Cancel</button>
        </div>
      </Modal>

      {/* Edit Product Modal */}
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
            value={editingProduct ? editingProduct.price : 0}
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
            value={editingProduct ? editingProduct.stock : 0}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                stock: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleEditProduct}>Save Changes</button>
          <button onClick={handleCancelEdit}>Cancel</button>
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
          {products.map((product) => (
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
