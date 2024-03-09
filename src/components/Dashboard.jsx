import React from 'react';
import { Link } from 'react-router-dom';
import initialOrders from './orderData';
import initialProducts from './productData';
import './Dashboard.css';

function Dashboard() {
  const totalProducts = initialProducts.length;
  const totalOrders = initialOrders.length;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-summary">
        <div className="dashboard-metric">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
          <Link to="/products">
            <button>Products Management</button>
          </Link>
        </div>
        <div className="dashboard-metric">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
          <Link to="/orders">
            <button>Orders Management</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
