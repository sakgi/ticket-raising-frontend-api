import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebaseconfig"; // Firebase config import
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"; // Firestore imports
import "./SuperAdminEngineerManag.css";

function Engineering() {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "users"), where("role", "==", "Admin"));
        const querySnapshot = await getDocs(q);
        // const engineerList = querySnapshot.docs.map((doc) => {
        //   const data = doc.data();
        //   return {
        //     id: doc.id,
        //     fullName: `${data.First_Name || "N/A"} ${data.Last_Name || "N/A"}`, // Concatenate firstName and lastName
        //     Circle: data.Circleircle || "N/A",
        //     Email: data.Email || "N/A",
        //     Employee_ID: data.Employee_ID || "N/A",
        //     Mobile_Number: data.Mobile_Number || "N/A",
        //     Organization: data.Organization || "N/A",
        //     role: data.role || "N/A",
        //   };
        // });

        const engineerList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fullName: `${data.First_Name || 'N/A'} ${data.Last_Name || 'N/A'}`, // Concatenated correctly
            Circle: data.Circle || 'N/A', // Make sure this is the correct field
            Email: data.Email || 'N/A',
            Employee_ID: data.Employee_ID || 'N/A',
            Mobile_Number: data.Mobile_Number || 'N/A',
            Organization: data.Organization || 'N/A',
            role: data.role || 'N/A', // Ensure this field is present in Firestore
          };
        });
        setEngineers(engineerList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to fetch engineers from Firebase: ${error.message}`,
          confirmButtonText: "OK",
        });
      }
    };
    fetchEngineers();
  }, []);

  // Handle add engineer button click
  const handleAddEngineerClick = () => {
    navigate("/SuperAdminDashboard/add-engineer");
  };

  // Handle delete engineer action
  const handleDeleteClick = async (id) => {
    const engineerRef = doc(db, "users", id); // Reference to the engineer document

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this engineer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(engineerRef); // Delete the engineer from Firestore
          const updatedEngineers = engineers.filter(
            (engineer) => engineer.id !== id
          );
          setEngineers(updatedEngineers); // Update the local state
          Swal.fire("Deleted!", "The engineer has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Failed to delete engineer: ${error.message}`,
          });
        }
      }
    });
  };

  // Filter engineers based on the search query
  const filteredEngineers = engineers.filter((engineer) =>
    engineer.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="engineering-container">
      <div className="header-area">
        <h1>Engineer Management</h1>
      </div>

      <div className="top-section">
        <button className="add-engineer" onClick={handleAddEngineerClick}>
          Add Engineer
        </button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-icon">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading engineers...</p>
        ) : (
          <table className="engineering-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Circle</th>
                <th>Mobile Number</th>
                <th>Organization</th>
                <th>Role</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredEngineers.length > 0 ? (
                filteredEngineers.map((engineer) => (
                  <tr key={engineer.id}>
                    <td>{engineer.Employee_ID || "N/A"}</td>
                    <td>{engineer.fullName || "N/A"}</td>
                    <td>{engineer.Email || "N/A"}</td>
                    <td>{engineer.Circle || "N/A"}</td>
                    <td>{engineer.Mobile_Number || "N/A"}</td>
                    <td>{engineer.Organization || "N/A"}</td>
                    <td>{engineer.role || "N/A"}</td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteClick(engineer.id)}
                      >
                        Delete Account
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No engineers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* This Outlet renders only if the path is not for add-engineer */}
      {location.pathname !== "/admin-tickets/add-engineer" && <Outlet />}
    </div>
  );
}

export default Engineering;
