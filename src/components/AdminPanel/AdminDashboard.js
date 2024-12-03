import React, { useState } from "react";
import {
  FaBars,
  FaTicketAlt,
  FaFileAlt,
  FaCheckCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { motion } from "framer-motion"; // Import Framer Motion
import "./AdminDashboard.css";
// import logo from "../assets/logo.png";
import logo from "../Auth/Logo.png";

function AdminTickets() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSpecialRoute =
    location.pathname.includes("/admin-tickets/new-ticket") ||
    location.pathname.includes("/admin-tickets/add-engineer");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You'll be logged out from the system.",
      icon: "warning",
      background: "#f7f9fc",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, keep me logged in",
      customClass: {
        popup: "custom-popup",
        confirmButton: "custom-confirm-button",
        cancelButton: "custom-cancel-button",
      },
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
          navigate("/"); // Redirect to the login page
        }, 1000); // Delay navigation for 1 second to allow animation to finish
      }
    });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-tickets-container">
      {!isSpecialRoute && (
        <header className="header">
          <div className="hamburger" onClick={toggleSidebar}>
            <FaBars />
          </div>
          <div className="navbar-right">
          <motion.span
                  className="animated-text"
                  initial={{ opacity: 0, y: -50 }} // Starting point of the animation (offscreen and invisible)
                  animate={{ opacity: 1, y: 0 }} // Ending point (fully visible and in position)
                  transition={{ duration: 1, ease: "easeOut" }}// Animation duration and easing
                >
                  Insta ICT Solutions
                </motion.span>
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </header>
      )}

      {!isSpecialRoute && (
        <motion.div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          initial={{ opacity: 0, x: -240 }} // Start off-screen and invisible
          animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -240 }} // Animate to visible
          exit={{ opacity: 0, x: -240 }} // Animate back to hidden
          transition={{ duration: 0.4 }} // Duration of the transition
        >
          <div className="top-section">
            <h2 className="sidebar-title">Admin Dashboard</h2>
            <ul>
              <li>
                <Link to="tickets" onClick={closeSidebar}>
                  <FaTicketAlt className="icon" />
                  <span>Tickets</span>
                </Link>
              </li>
              
              <li>
                <Link to="admin-report-generation" onClick={closeSidebar}>
                  <FaFileAlt className="icon" />
                  <span>Report Generation</span>
                </Link>
              </li>
              <li>
                <Link to="approval" onClick={closeSidebar}>
                  <FaCheckCircle className="icon" />
                  <span>My Tickets</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bottom-section">
            <ul>
              <li className="profile">
                <Link to="profile" onClick={closeSidebar}>
                  <FaUserCircle className="icon" />
                  <span>Profile</span>
                </Link>
              </li>
              <li className="logout" onClick={handleLogout}>
                <FaSignOutAlt className="icon" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      <div
        className={`content ${
          isSidebarOpen && !isSpecialRoute ? "sidebar-open" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminTickets;