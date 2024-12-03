import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Firebase Firestore
import { MenuItem, Select } from "@mui/material"; // Import Material-UI components
import "./SuperAdminProfile.css";

// PopupDialog component
const PopupDialog = ({ message, onClose }) => {
  return (
    <div className="popup-dialog">
      <div className="popup-content">
        <h4>{message}</h4>
        <button className="close-popup-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

const ProfileForm = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState(""); // State for email error
  const [loading, setLoading] = useState(true); // To track loading state
  const [formData, setFormData] = useState({
    First_Name: "",
    Last_Name: "",
    Employee_ID: "",
    Email: "",
    Mobile_Number: "",
    Circle: "",
    Organization: "",
  });
  const [isEditable, setIsEditable] = useState({
    Email: false,
    Mobile_Number: false,
    Circle: false, // Circle is editable
    Organization: false, // Organization is not editable
  });

  const auth = getAuth();
  const db = getFirestore();

  // Circle options
  const circleOptions = [
    { value: "MP", label: "Madhya Pradesh" },
    { value: "UPW", label: "UP West" },
    { value: "UPE", label: "UP East" },
    { value: "RJ", label: "Rajasthan" },
    { value: "GUJ", label: "Gujrat" },
    { value: "MH", label: "Maharashtra" },
    { value: "pune", label: "Corporate Office Pune" },
    { value: "BH", label: "Bihar" },
    { value: "ROB", label: "Rest of Bengal" },
    { value: "PNB", label: "Punjab" },
    { value: "KTK", label: "Karnataka" },
    { value: "MUM", label: "Mumbai" },
    { value: "CH", label: "Chennai" },
    { value: "JH", label: "Jharkand" },
    { value: "KOC", label: "Kolkata" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "ROTN", label: "Rest of Tamil Nadu" },
    { value: "KE", label: "Kerala" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = user.uid;
          try {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              setFormData(userDocSnap.data());
              setLoading(false); // Stop loading once data is fetched
            } else {
              setPopupMessage("User  data not found.");
              setShowPopup(true);
              setLoading(false); // Stop loading even if no data is found
            }
          } catch (error) {
            console.error("Error fetching user data:", error.message);
            setPopupMessage("Failed to fetch user data.");
            setShowPopup(true);
            setLoading(false); // Stop loading on error
          }
        } else {
          setPopupMessage("No authenticated user found.");
          setShowPopup(true);
          setLoading(false); // Stop loading if no user is found
        }
      });
    };

    fetchUserData();
  }, [auth, db]);

  const handleChangePassword = () => {
    // Check phone number before changing password
    if (formData.Mobile_Number.length !== 10) {
      setPopupMessage("Phone number must be exactly 10 digits before changing password.");
      setShowPopup(true);
      return;
    }
    navigate("/user-dashboard/change-password");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Validate phone number
    if (id === "Mobile_Number") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setPhoneError(""); // Clear error if valid
      } else if (value.length < 10) {
        setPhoneError("Please enter a 10-digit phone number.");
      } else {
        setPhoneError("Phone number must be numeric and exactly 10 digits.");
      }
    } else if (id === "Email") {
      // Validate email format
      if (value.includes("@")) {
        setFormData((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setEmailError(""); // Clear error if valid
      } else {
        setEmailError("Email must contain '@'.");
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleCircleChange = (event) => {
    setFormData((prev) => ({ ...prev, Circle: event.target.value }));
  };

  const handleSaveChanges = async () => {
    // Check for errors before saving
    if (phoneError || emailError || formData.Mobile_Number.length !== 10) {
      setPopupMessage("Please fix the errors before saving.");
      setShowPopup(true);
      return;
    }

    try {
      const user = auth.currentUser ;
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          Email: formData.Email,
          Mobile_Number: formData.Mobile_Number,
          Circle: formData.Circle,
          Organization: formData.Organization, // Include Organization in the update
        });
        setPopupMessage("Changes saved successfully!");
        setShowPopup(true);
      } else {
        setPopupMessage("No authenticated user found.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error saving changes:", error.message);
      setPopupMessage("Failed to save changes.");
      setShowPopup(true);
    }
  };

  const toggleEditField = (field) => {
    setIsEditable((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // If loading, show a loading message
  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-form-container">
      <div className="profile-header">
        <h2 className="profile-name">
          {formData.First_Name} {formData.Last_Name}
        </h2>
      </div>
      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="First_Name">First Name</label>
            <input
              type="text"
              id="First_Name"
              value={formData.First_Name}
              placeholder="First Name"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="Last_Name">Last Name</label>
            <input
              type="text"
              id="Last_Name"
              value={formData.Last_Name}
              placeholder="Last Name"
              disabled
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Employee_ID">Employee ID</label>
          <input
            type="text"
            id="Employee_ID"
            value={formData.Employee_ID}
            placeholder="Employee ID"
            disabled
          />
        </div>
  
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="Email"
                value={formData.Email}
                onChange={handleInputChange}
                disabled={!isEditable.Email}
                placeholder="Email Address"
              />
              <FaEdit
                className="edit-icon"
                onClick={() => toggleEditField("Email")}
              />
            </div>
            {emailError && <p className="error-message">{emailError}</p>} {/* Display email error */}
          </div>
          <div className="form-group">
            <label htmlFor="Mobile_Number">Phone Number</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="Mobile_Number"
                value={formData.Mobile_Number}
                onChange={handleInputChange}
                disabled={!isEditable.Mobile_Number}
                placeholder="Phone Number"
              />
              <FaEdit
                className="edit-icon"
                onClick={() => toggleEditField("Mobile_Number")}
              />
            </div>
            {phoneError && <p className="error-message">{phoneError}</p>} {/* Display phone error */}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Circle">Circle</label>
          <div className="input-wrapper">
            <Select
              id="Circle"
              value={formData.Circle}
              onChange={handleCircleChange}
              disabled={!isEditable.Circle}
              displayEmpty
            >
              <MenuItem value="" disabled>Select Circle</MenuItem>
              {circleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FaEdit
              className="edit-icon"
              onClick={() => toggleEditField("Circle")}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Organization">Organization</label>
          <input
            type="text"
            id="Organization"
            value={formData.Organization}
            placeholder="Current Organization"
            disabled
          />
        </div>
  
        <div className="button-container">
          <button
            type="button"
            className="save-changes-btn"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="change-password-btn"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </form>
      {showPopup && (
        <PopupDialog message={popupMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
};
  export default ProfileForm;