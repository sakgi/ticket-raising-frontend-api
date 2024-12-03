import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import './UserDashboard.css';

const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // Get the current location

  // Function to add a new ticket
  const addNewTicket = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
    navigate('/user-dashboard/mytickets'); // Redirect back to the tickets table after adding a new ticket
  };

  // Check if the current path is '/user-dashboard/change-password'
  const isChangePasswordPage = location.pathname === '/user-dashboard/change-password';

  return (
    <div className="user-dashboard-container-trt">
      {/* Conditionally render Navbar */}
      {!isChangePasswordPage && <Navbar toggleSidebar={toggleSidebar} />}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`content-trt ${isSidebarOpen ? 'sidebar-open-trt' : ''}`}>
        {/* The Outlet will render the nested routes */}
        <Outlet context={{ tickets, addNewTicket }} />
      </div>
    </div>
  );
};

export default UserDashboard;