import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './OrdersCalendarView.css';

function OrdersCalendarView({ ordersData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDeliveries, setSelectedDeliveries] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [todaysDeliveries, setTodaysDeliveries] = useState([]);

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement('#root');
  }, []);
  
  useEffect(() => {
    // Filter today's orders and deliveries
    const today = new Date().toDateString();
    const todayOrders = ordersData.filter(
      (order) => new Date(order.orderDate).toDateString() === today
    );
    const todayDeliveries = ordersData.filter(
      (order) => new Date(order.expectedDeliveryDate).toDateString() === today
    );

    setTodaysOrders(todayOrders);
    setTodaysDeliveries(todayDeliveries);
  }, [ordersData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Filter orders on selected date
    const ordersOnSelectedDate = ordersData.filter(
      (order) => new Date(order.orderDate).toDateString() === date.toDateString()
    );

    // Filter deliveries on selected date
    const deliveriesOnSelectedDate = ordersData.filter(
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
      <h2>Oders Calendar View</h2>
      <div className="calendar-and-data-container">
        {/* Calendar */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>

        {/* Today's Orders and Deliveries */}
        <div className="todays-data">
          <h3>Today's Orders</h3>
          {todaysOrders.map((order) => (
            <div key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Customer Name: {order.customerName}</p>
              <p>Status: {order.status}</p>
              <hr />
            </div>
          ))}
          
          <h3>Today's Deliveries</h3>
          {todaysDeliveries.map((delivery) => (
            <div key={delivery.id}>
              <p>Delivery ID: {delivery.id}</p>
              <p>Customer Name: {delivery.customerName}</p>
              <p>Status: {delivery.status}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>

      {/* Orders Calendar Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Orders Calendar Modal"
        className="modal"
      >
        <h2>{selectedDate.toDateString()}</h2>
        <h3>Orders:</h3>
        {selectedOrders.map((order) => (
          <div key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Customer Name: {order.customerName}</p>
            <p>Status: {order.status}</p>
            <hr />
          </div>
        ))}

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
