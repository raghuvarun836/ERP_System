import React, { useState } from 'react';
import Modal from 'react-modal';
import './Orders.css';

const statusOptions = ['Pending', 'Shipped', 'Delivered'];

function Orders({ ordersData, setOrdersData }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteOrder = (orderId) => {
    // Update the ordersData state by filtering out the deleted order
    setOrdersData((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const handleViewOrder = (orderId) => {
    const order = ordersData.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setViewModalOpen(true);
  };

  const handleEditOrder = (orderId) => {
    const order = ordersData.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setEditModalOpen(true);
  };

  const handleUpdateStatus = (newStatus) => {
    setOrdersData((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  return (
    <div className='container'>
      <h2>Orders Management</h2>
      
      {/* View Order Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onRequestClose={() => setViewModalOpen(false)}
        contentLabel="View Order Modal"
        className="modal"
      >
        <h3>Order Details</h3>
        {selectedOrder && (
          <div>
            <p>Order ID: {selectedOrder.id}</p>
            <p>Customer Name: {selectedOrder.customerName}</p>
            <p>Order Date: {selectedOrder.orderDate}</p>
            <p>Expected Delivery Date: {selectedOrder.expectedDeliveryDate}</p>
            <p>Status: {selectedOrder.status}</p>
          </div>
        )}
        <div className="form-buttons">
          <button className='cancel' onClick={() => setViewModalOpen(false)}>Close</button>
        </div>
      </Modal>

      {/* Edit Order Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        contentLabel="Edit Order Modal"
        className="modal"
      >
        <h3>Edit Order</h3>
        {selectedOrder && (
          <div>
            <p>Order ID: {selectedOrder.id}</p>
            <p>Customer Name: {selectedOrder.customerName}</p>
            <p>Order Date: {selectedOrder.orderDate}</p>
            <p>Expected Delivery Date: {selectedOrder.expectedDeliveryDate}</p>
            <label>Status:</label>
            <select
              value={selectedOrder.status}
              onChange={(e) => handleUpdateStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="form-buttons">
          <button className='cancel' onClick={handleCancelEdit}>Cancel</button>
        </div>
      </Modal>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Expected Delivery Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.orderDate}</td>
              <td>{order.expectedDeliveryDate}</td>
              <td>{order.status}</td>
              <td>
                <button className="view-button" onClick={() => handleViewOrder(order.id)}>View</button>
                <button className="edit-button" onClick={() => handleEditOrder(order.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
