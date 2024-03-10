import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import initialOrders from './orderData';
import './OrdersCalendarView.css';

function OrdersCalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const ordersOnSelectedDate = initialOrders.filter(
      (order) => new Date(order.orderDate).toDateString() === date.toDateString()
    );

    const deliveriesOnSelectedDate = initialOrders.filter(
      (order) => new Date(order.expectedDeliveryDate).toDateString() === date.toDateString()
    );

    setSelectedOrders(ordersOnSelectedDate);
    setSelectedDeliveries(deliveriesOnSelectedDate);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className='container'>
      <h2>Orders Calendar View</h2>

      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Orders Calendar Modal"
        className="modal"
      >
        <h2>{selectedDate.toDateString()}</h2>
        <h3>Orders:</h3>
        <div>
          {selectedOrders.map((order) => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Customer Name: {order.customerName}</p>
              <p>Status: {order.status}</p>
              <hr />
            </div>
          ))}
        </div>

        <div>
          <h3>Deliveries:</h3>
          {selectedDeliveries.map((delivery) => (
            <div key={delivery.id}>
              <p>Delivery ID: {delivery.id}</p>
              <p>Customer Name: {delivery.customerName}</p>
              <p>Status: {delivery.status}</p>
              <hr />
            </div>
          ))}
        </div>

        <div className="form-buttons">
          <button className='cancel' onClick={handleModalClose}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

export default OrdersCalendarView;
