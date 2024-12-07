import React, { useState, useEffect } from "react";
import "./NewTicket.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useLocation } from "react-router-dom"; // Import useLocation

import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  Timestamp, 
  doc, 
  getDoc,
  setDoc, 
  increment 
} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function NewTicket() { 
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [role, setRole] = useState(''); // Initialize role state
  const [onBehalfOf, setOnBehalfOf] = useState("self");
  const [Employee_ID, setEmployee_ID] = useState("");
  const [debouncedEmployee_ID, setDebouncedEmployee_ID] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [issueType, setIssueType] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [employeeExists, setEmployeeExists] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const db = getFirestore();
  const storage = getStorage();

  // Retrieve role from sessionStorage when the component mounts
  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole") || 'Admin'; // Default to 'Admin' if not found
    setRole(userRole);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onBehalfOf === "others" && Employee_ID) {
        setDebouncedEmployee_ID(Employee_ID);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [Employee_ID, onBehalfOf]);

  useEffect(() => {
    if (debouncedEmployee_ID && onBehalfOf === "others") {
      const checkEmployeeExists = async () => {
        const q = query(
          collection(db, "users"),
          where("Employee_ID", "==", debouncedEmployee_ID)
        );
        const querySnapshot = await getDocs(q);
        setEmployeeExists(!querySnapshot.empty);
      };

      checkEmployeeExists();
    }
  }, [debouncedEmployee_ID, db, onBehalfOf]);

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const maxSizeInMB = 5; // Maximum file size in MB
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes

    if (file) {
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          title: 'Error!',
          text: `File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        e.target.value = ''; // Clear the input
      } else {
        setAttachment(file); // Store the file in state
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!subject || !deviceType || !issueType || (onBehalfOf === "others" && !Employee_ID)) {
      setFormErrors("Please fill all the mandatory fields.");
      return;
    }
  
    if (onBehalfOf === "others" && !employeeExists) {
      setFormErrors("No employee found with this Employee_ID.");
      return;
    }
  
    setFormErrors("");
  
    const auth = getAuth();
    const user = auth.currentUser ;
  
    if (!user) {
      setFormErrors("User  not authenticated.");
      return;
    }
  
    const userId = user.uid;
  
    let employeeDocId = null;
    if (onBehalfOf === "others") {
      const employeeDoc = await getDocs(query(collection(db, "users"), where("Employee_ID", "==", Employee_ID)));
      if (employeeDoc.empty) {
        setFormErrors("No employee found with this Employee_ID.");
        return;
      }
      employeeDocId = employeeDoc.docs[0].id;
    }
  
    const generateUniqueTicketId = async (userId) => {
      const prefix = "INSTAA";
      const now = new Date();
      const year = now.getFullYear().toString().slice(2);
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      let ticketNumber = 1;
  
      while (true) {
        const newTicketCount = ticketNumber.toString().padStart(3, "0");
        const ticketId = `${prefix}${year}${month}${newTicketCount}`;
  
        // Check if the ticketID already exists
        const ticketRef = doc(db, "TicketList", ticketId);
        const ticketDoc = await getDoc(ticketRef);
        if (!ticketDoc.exists()) {
          return ticketId; // If ticketID is unique, return it
        }
        ticketNumber++; // Otherwise, increment and try again
      }
    };
  
    setLoading(true); // Start loading

    try {
      let attachmentUrl = null;
      if (attachment) {
        const storageRef = ref(storage, `attachments/${attachment.name}`);
        const uploadTask = uploadBytesResumable(storageRef, attachment);
        await uploadTask;
        attachmentUrl = await getDownloadURL(storageRef);
      }
  
      const ticketId = await generateUniqueTicketId(employeeDocId || userId);
  
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
  
      const now = new Date();
      const date = formatDate(now);
      const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", second: "numeric", hour12: true });
  
      const ticketData = {
        subject,
        description,
        onBehalfOf,
        Employee_ID: onBehalfOf === "others" ? Employee_ID : "self",
        deviceType,
        issueType,
        attachmentUrl,
        ticketID: ticketId,
        createdAt: Timestamp.fromDate(new Date()),
        createdBy: userId,
        date,
        time,
        status: "Raised",
      };
  
      // Use setDoc with the unique ticketID
      const ticketDocRef = doc(db, "TicketList", ticketId);
      await setDoc(ticketDocRef, ticketData);
  
      const adminCounterRef = doc(db, "adminticketcounter", "counter");
      await setDoc(adminCounterRef, { count: increment(1) }, { merge: true });
  
      Swal.fire({
        title: "Success!",
        text: "Your ticket has been raised successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        if (role === "Admin") {
          navigate(-1);
        } else {
          navigate("/SuperAdminDashboard/tickets");
        }
      });
    } catch (error) {
      console.error("Error submitting ticket:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to raise ticket.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
  const handleCancel = () => {
    navigate("/admin-tickets/tickets");
  };

  return (
    <div className="new-ticket-container">
      {loading && <div className="loading-spinner">Loading...</div>} {/* Add a loading spinner */}
      <h2>Raise Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        {/* Subject */}
        <div>
          <label>Subject (*): </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        {/* On Behalf Of */}
        <div>
          <label>On Behalf Of (*): </label>
          <select
            value={onBehalfOf}
            onChange={(e) => setOnBehalfOf(e.target.value)}
          >
            <option value="self">Self</option>
            <option value="others">Other Employee</option>
          </select>
        </div>

        {onBehalfOf === "others" && (
          <div>
 <label>Enter Employee-ID (Mandatory ): </label>
            <input
              type="text"
              value={Employee_ID}
              onChange={(e) => setEmployee_ID(e.target.value)}
              required={onBehalfOf === "others"}
            />
            {formErrors && !employeeExists && (
              <p style={{ color: "red" }}>
                No employee found with this Employee_ID.
              </p>
            )}
          </div>
        )}

        {/* Device Type */}
        <div>
          <label>Device Type (*): </label>
          <select
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            required
          >
            <option value="">Select Device Type</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Network">Network</option>
            <option value="Printer">Printer</option>
            <option value="Router">Router</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Issue Type */}
        <div>
          <label>Issue Type (*): </label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
          >
            <option value="">Select Issue Type</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Attachment */}
        <div>
          <label>Attachment : </label>
          <input
            type="file"
            onChange={handleAttachmentChange}
            accept=".pdf, .doc, .docx, .xls, .xlsx, image/*"
          />
        </div>

        {/* Description */}
        <div>
          <label>Description: </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {formErrors && <p style={{ color: "red" }}>{formErrors}</p>}

        <div className="form-buttons">
          <button type="submit" disabled={loading}>Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTicket;