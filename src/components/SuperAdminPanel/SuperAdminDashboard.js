// import React, { useState, useEffect } from "react";
// import {
//   FaBars,
//   FaTicketAlt,
//   FaUsers,
//   FaFileAlt,
//   FaCheckCircle,
//   FaUserCircle,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert
// import { motion } from "framer-motion"; // Import Framer Motion
// import { Ripples } from "@uiball/loaders"; // Correctly import Ripples loader
// import "./SuperAdminDashboard.css";
// import logo from "../Auth/Logo.png";

// function AdminTickets() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isSpecialRoute =
//     location.pathname.includes("/SuperAdminDashboard/new-ticket");
//     // location.pathname.includes("/SuperAdminDashboard/ticket-detail");
//     // location.pathname.includes("/SuperAdminDashboard/viewticket");
//   useEffect(() => {
//     // Simulate a loading delay (2 seconds)
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 550); // Change the duration as per your need

//     return () => clearTimeout(timer);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure you want to logout?",
//       text: "You'll be logged out from the system.",
//       icon: "warning",
//       background: "#f7f9fc",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, log me out!",
//       cancelButtonText: "No, keep me logged in",
//       customClass: {
//         popup: "custom-popup",
//         confirmButton: "custom-confirm-button",
//         cancelButton: "custom-cancel-button",
//       },
//       showClass: {
//         popup: "animate__animated animate__fadeInDown",
//       },
//       hideClass: {
//         popup: "animate__animated animate__fadeOutUp",
//       },
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate("/"); // Directly navigate to the login page without delay
//       }
//     });
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   return (
//     <div className="admin-tickets-container">
//       {loading ? (
//         <div className="loader-container">
//           <Ripples size={40} speed={0.9} color="#007bff" />
//         </div>
//       ) : (
//         <>
//           <header className="header">
//             {/* Only render the hamburger menu if not on the special route */}
//             {!isSpecialRoute && (
//               <div className="hamburger" onClick={toggleSidebar}>
//                 <FaBars />
//               </div>
//             )}
//             <div className="navbar-right">
//               {/* Animated Insta ICT Solutions Text */}
//               <motion.span
//                 className="animated-text"
//                 initial={{ opacity: 0, y: -50 }} // Starting point of the animation (offscreen and invisible)
//                 animate={{ opacity: 1, y: 0 }} // Ending point (fully visible and in position)
//                 transition={{ duration: 1, ease: "easeOut" }} // Animation duration and easing
//               >
//                 Insta ICT Solutions
//               </motion.span>
//               <img src={logo} alt="Logo" className="logo" />
//             </div>
//           </header>

//           {!isSpecialRoute && (
//             <motion.div
//               className={`sidebar ${isSidebarOpen ? "open" : ""}`}
//               initial={{ opacity: 0, x: -240 }} // Start off-screen and invisible
//               animate={{
//                 opacity: isSidebarOpen ? 1 : 0,
//                 x: isSidebarOpen ? 0 : -240,
//               }} // Animate to visible
//               exit={{ opacity: 0, x: -240 }} // Animate back to hidden
//               transition={{ duration: 0.4 }} // Duration of the transition
//             >
//               <div className="top-section">
//                 <h2 className="sidebar-title">Admin Dashboard</h2>
//                 <ul>
//                   <li>
//                     <Link to="tickets" onClick={closeSidebar}>
//                       <FaTicketAlt className="icon" />
//                       <span>Tickets</ span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="engineering" onClick={closeSidebar}>
//                       <FaUsers className="icon" />
//                       <span>Engineer</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="report-generation" onClick={closeSidebar}>
//                       <FaFileAlt className="icon" />
//                       <span>Report Generation</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="approval" onClick={closeSidebar}>
//                       <FaCheckCircle className="icon" />
//                       <span>My Tickets</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               <div className="bottom-section">
//                 <ul>
//                   <li className="profile">
//                     <Link to="profile" onClick={closeSidebar}>
//                       <FaUserCircle className="icon" />
//                       <span>Profile</span>
//                     </Link>
//                   </li>
//                   <li className="logout" onClick={handleLogout}>
//                     <FaSignOutAlt className="icon" />
//                     <span>Logout</span>
//                   </li>
//                 </ul>
//               </div>
//             </motion.div>
//           )}

//           <div
//             className={`content ${
//               isSidebarOpen && !isSpecialRoute ? "sidebar-open" : ""
//             }`}
//           >
//             <Outlet />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default AdminTickets;


















import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTicketAlt,
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import { motion } from "framer-motion"; // Import Framer Motion
import { Ripples } from "@uiball/loaders"; // Correctly import Ripples loader
import "./SuperAdminDashboard.css";
import logo from "../Auth/Logo.png";

function AdminTickets() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();
  const navigate = useNavigate();
  const isSpecialRoute =
    location.pathname.includes("/SuperAdminDashboard/new-ticket") ||
    location.pathname.includes("/SuperAdminDashboard/viewticket") ||
    location.pathname.includes("/SuperAdminDashboard/ticket-detail")||
    location.pathname.includes("/user-dashboard/change-password") ;
    // location.pathname.includes("/admin-tickets/add-engineer");

  useEffect(() => {
    // Simulate a loading delay (2 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 550); // Change the duration as per your need

    return () => clearTimeout(timer);
  }, []);

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
        popup: "animate_animated animate_fadeInDown",
      },
      hideClass: {
        popup: "animate_animated animate_fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); // Directly navigate to the login page without delay
      }
    });
  };
  

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-tickets-container">
      {loading ? (
        <div className="loader-container">
          <Ripples size={40} speed={0.9} color="#007bff" />
        </div>
      ) : (
        <>
          {!isSpecialRoute && (
            <header className="header">
              <div className="hamburger" onClick={toggleSidebar}>
                <FaBars />
              </div>
              <div className="navbar-right">
                {/* Animated Insta ICT Solutions Text */}
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
              animate={{
                opacity: isSidebarOpen ? 1 : 0,
                x: isSidebarOpen ? 0 : -240,
              }} // Animate to visible
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
    <Link to="engineering" onClick={closeSidebar}>
      <FaUsers className="icon" />
      <span>Engineer</span>
    </Link>
  </li>
  <li>
    <Link to="report-generation" onClick={closeSidebar}>
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
        </>
      )}
    </div>
  );
}

export default AdminTickets;