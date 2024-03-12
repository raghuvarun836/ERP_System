import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import OrdersCalendarView from "./components/OrdersCalendarView";
import "./App.css";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    // Fetching products data from json
    fetch("/Data/productsData.json")
      .then((response) => response.json())
      .then((data) => setProductsData(data))
      .catch((error) => console.error("Error fetching products data:", error));

    // Fetching orders data from json
    fetch("/Data/ordersData.json")
      .then((response) => response.json())
      .then((data) => setOrdersData(data))
      .catch((error) => console.error("Error fetching orders data:", error));
  }, []);

  return (
    <Router>
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/" activeclassname="active-link" exact="true">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/products" activeclassname="active-link">Products</NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeclassname="active-link">Orders</NavLink>
            </li>
            <li>
              <NavLink to="/calendar" activeclassname="active-link">Calendar</NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Dashboard productsData={productsData} ordersData={ordersData} />}/>
          <Route path="/products" element={<Products productsData={productsData} setProductsData={setProductsData} />}/>
          <Route path="/orders" element={<Orders ordersData={ordersData} setOrdersData={setOrdersData} />}/>
          <Route path="/calendar" element={<OrdersCalendarView ordersData={ordersData} />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
