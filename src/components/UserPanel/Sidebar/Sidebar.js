import React from "react";
import {
  FaTicketAlt,
  FaCheckCircle,
  FaUserCircle,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  // Show the logout confirmation dialog
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Close the logout confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle the logout process and redirect to the login page
  const handleConfirmLogout = () => {
    // Clear session data (e.g., token) from localStorage
    localStorage.removeItem("userToken");

    // Add any additional session cleanup if needed, such as clearing user data from state
    console.log("User logged out.");

    // Redirect the user to the login page after logout
    window.location.href = "/";

    // Close the confirmation dialog
    setOpenDialog(false);
  };

  return (
    <>
      <div className={`sidebar-trt ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link className="button-trt" to="ticket-form" onClick={toggleSidebar}>
              <FaPlusCircle className="icon-trt" />
              <span>New Ticket</span>
            </Link>
          </li>
          <li>
            <Link to="mytickets" onClick={toggleSidebar}>
              <FaTicketAlt className="icon-trt" />
              <span>Tickets</span>
            </Link>
          </li>
          <li>
            <Link to="faq" onClick={toggleSidebar}>
              <FaCheckCircle className="icon-trt" />
              <span>FAQ</span>
            </Link>
          </li>
        </ul>

        <div className="profile-trt">
          <Link to="profile" onClick={toggleSidebar}>
            <FaUserCircle className="icon-trt" />
            <span>Profile</span>
          </Link>
        </div>

        <div className="logout-container-trt">
          <Button
            className="logout-btn-trt"
            startIcon={<FaSignOutAlt />}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} classes={{ paper: "logout-dialog" }}>
        <DialogTitle className="dialog-title-trt">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to log out?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sidebar overlay */}
      <div className={`overlay-trt ${isOpen ? "show" : ""}`} onClick={toggleSidebar}></div>
    </>
  );
};

export default Sidebar;
