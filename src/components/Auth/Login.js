// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { getDoc, getFirestore, doc } from "firebase/firestore";
// import { auth } from "../../firebase/firebaseconfig.js";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import Tooltip from "@mui/material/Tooltip";
// import axios from "axios";
// import "./Login.css";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const allowedEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)\.com$/;
//   const passwordCriteria = [
//     // { label: "At least 6 characters", test: /.{6,}/ },
//     // { label: "At least 1 uppercase letter", test: /[A-Z]/ },
//     // { label: "At least 1 lowercase letter", test: /[a-z]/ },
//     // { label: "At least 1 number", test: /[0-9]/ },
//     // { label: "At least 1 special character", test: /[!@#$%^&*(),.?":{}|<>]/ },
//   ];

//   const isCriteriaMet = (test) => test.test(password);

//   const handleLogin = async (e) => {
//     const db = getFirestore();
//     e.preventDefault();
//     setMessage("");

//     if (!allowedEmailRegex.test(email)) {
//       setError("Email domain must be gmail.com, outlook.com, or yahoo.com");
//       return;
//     }

//     const allCriteriaMet = passwordCriteria.every((criteria) =>
//       isCriteriaMet(criteria.test)
//     );
//     if (!allCriteriaMet) {
//       setError("Password does not meet the required criteria.");
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       const uid = user.uid;
//       const idToken = await user.getIdToken();
//       const docPath = doc(db, "users", uid);
//       const employeeDoc = await getDoc(docPath);
//       const employeeData = employeeDoc.data();
//       const employeeId = employeeData.Employee_ID;
//       const role = employeeData.role;
//       sessionStorage.setItem("userRole", role);
//       sessionStorage.setItem("employeeId", employeeId);
//       localStorage.setItem("token", idToken);
//         setMessage("Login successful!");
//         setMessageType("success");
//       let dashboardPath = "/user-dashboard/mytickets";
//       if (role === "Admin") {
//         dashboardPath = "/AdminDashboard/tickets";
//       } else if (role === "SuperAdmin") {
//         dashboardPath = "/SuperAdminDashboard/tickets";
//       }
//         navigate(dashboardPath, { state: { role } });
//     } catch (error) {
//       let errorMessage = "";

//       if (
//         error.code === "auth/user-not-found" ||
//         error.code === "auth/invalid-email"
//       ) {
//         errorMessage = "Please enter a valid email address.";
//       } else if (error.code === "auth/wrong-password") {
//         errorMessage = "Incorrect password. Please try again.";
//       } else if (error.code === "auth/invalid-credential") {
//         errorMessage = "Invalid credentials. Please try again.";
//       } else {
//         errorMessage = error.message;
//       }

//       console.error("Error logging in: ", errorMessage);
//       setMessage(errorMessage);
//       setMessageType("error");
//     }
//   };

//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   const handleRegistration = () => {
//     navigate("/registration");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image-container">
//         <img
//           src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
//           alt="Login"
//         />
//       </div>
//       <div className="login-form-container">
//         <h2>Login</h2>
//         {message && (
//           <div
//             className={
//               messageType === "success"
//                 ? "login-message-success"
//                 : "login-message-error"
//             }
//           >
//             {message}
//           </div>
//         )}
//         <form onSubmit={handleLogin}>
//           <div className="form-group-container">
//             <Tooltip
//               title="Email domain must be gmail.com, outlook.com, or yahoo.com"
//               arrow
//               placement="top"
//             >
//               <div>
//                 <label>Email ID:</label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your Email ID"
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </Tooltip>
//           </div>
//           <div className="form-group-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {error && <p className="login-error-message">{error}</p>}

//           <div className="login-button-container">
//             <Stack direction="row" spacing={2}>
//               <Button type="submit" variant="contained">
//                 Submit
//               </Button>
//               <Button variant="outlined" onClick={handleForgotPassword}>
//                 Forgot Password
//               </Button>
//             </Stack>
//             <Stack direction="row" spacing={2} mt={2}>
//               <Button variant="text" onClick={handleRegistration}>
//                 Registration
//               </Button>
//             </Stack>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default UserLogin;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { getDoc, getFirestore, doc } from "firebase/firestore";
// import { auth } from "../../firebase/firebaseconfig.js";
// import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import Tooltip from "@mui/material/Tooltip";
// import "./Login.css";

// const UserLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     const db = getFirestore();
//     e.preventDefault();
//     setMessage("");

//     // Removed email format validation
//     if (!email) {
//       setError("Email is required.");
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       const uid = user.uid;
//       const idToken = await user.getIdToken();
//       const docPath = doc(db, "users", uid);
//       const employeeDoc = await getDoc(docPath);
//       const employeeData = employeeDoc.data();
//       const employeeId = employeeData.Employee_ID;
//       const role = employeeData.role;
//       sessionStorage.setItem("userRole", role);
//       sessionStorage.setItem("employeeId", employeeId);
//       localStorage.setItem("token", idToken);
//       setMessage("Login successful!");
//       setMessageType("success");
//       let dashboardPath = "/user-dashboard/mytickets";
//       if (role === "Admin") {
//         dashboardPath = "/AdminDashboard/tickets";
//       } else if (role === "SuperAdmin") {
//         dashboardPath = "/SuperAdminDashboard/tickets";
//       }
//       navigate(dashboardPath, { state: { role } });
//     } catch (error) {
//       let errorMessage = "";

//       if (
//         error.code === "auth/user-not-found" ||
//         error.code === "auth/invalid-email"
//       ) {
//         errorMessage = "Please enter a valid email address.";
//       } else if (error.code === "auth/wrong-password") {
//         errorMessage = "Incorrect password. Please try again.";
//       } else if (error.code === "auth/invalid-credential") {
//         errorMessage = "Invalid credentials. Please try again.";
//       } else {
//         errorMessage = error.message;
//       }

//       console.error("Error logging in: ", errorMessage);
//       setMessage(errorMessage);
//       setMessageType("error");
//     }
//   };

//   const handleForgotPassword = () => {
//     navigate("/forgot-password");
//   };

//   const handleRegistration = () => {
//     navigate("/registration");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image-container">
//         <img
//           src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
//           alt="Login"
//         />
//       </div>
//       <div className="login-form-container">
//         <h2>Login</h2>
//         {message && (
//           <div
//             className={
//               messageType === "success"
//                 ? "login-message-success"
//                 : "login-message-error"
//             }
//           >
//             {message}
//           </div>
//         )}
//         <form onSubmit={handleLogin}>
//           <div className="form-group-container">
//             <Tooltip
//               title="Email must be a valid email address"
//               arrow
//               placement="top"
//             >
//               <div>
//                 <label>Email ID:</label>
//                 <input
//                   type="email"
//                   value={email}
//                   placeholder="Enter your Email ID"
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </Tooltip>
//           </div>
//           <div className="form-group-container">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {error && <p className="login-error-message">{error}</p>}

//  <div className="login-button-container">
//             <Stack direction="row" spacing={2}>
//               <Button type="submit" variant="contained">
//                 Submit
//               </Button>
//               <Button variant="outlined" onClick={handleForgotPassword}>
//                 Forgot Password
//               </Button>
//             </Stack>
//             <Stack direction="row" spacing={2} mt={2}>
//               <Button variant="text" onClick={handleRegistration}>
//                 Registration
//               </Button>
//             </Stack>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, getFirestore, doc , setDoc} from "firebase/firestore";
import { auth } from "../../firebase/firebaseconfig.js";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";  
import Swal from "sweetalert2"; // Import SweetAlert
import "./Login.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const db = getFirestore();
    e.preventDefault();
    setMessage("");

    if (!email) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email is required.',
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const uid = user.uid;
      const idToken = await user.getIdToken();
      const docPath = doc(db, "users", uid);
      const employeeDoc = await getDoc(docPath);
      const employeeData = employeeDoc.data();
      const employeeId = employeeData.Employee_ID;
      const role = employeeData.role;
      await setDoc(docPath, { tokenId: idToken }, { merge: true });

      sessionStorage.setItem("userRole", role);
      sessionStorage.setItem("employeeId", employeeId);
      sessionStorage.setItem("token", idToken);
      setMessage("Login successful!");
      setMessageType("success");
      let dashboardPath = "/user-dashboard/mytickets";
      if (role === "Admin") {
        dashboardPath = "/AdminDashboard/tickets";
      } else if (role === "SuperAdmin") {
        dashboardPath = "/SuperAdminDashboard/tickets";
      }
      navigate(dashboardPath, { state: { role , tokenId: idToken} });
    } catch (error) {
      let errorMessage = "";

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-email"
      ) {
        errorMessage = "Please enter a correct email ID.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Please enter the correct password.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials. Please try again.";
      } else {
        errorMessage = error.message;
      }

      console.error("Error logging in: ", errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
      });
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
          alt="Login"
        />
      </div>
      <div className="login-form-container">
        <h2>Login</h2>
        {message && (
          <div
            className={
              messageType === "success"
                ? "login-message-success"
                : "login-message-error"
            }
          >
            {message}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="form-group-container">
            <Tooltip
              title="Email must be a valid email address"
              arrow
              placement="top"
            >
              <div>
                <label>Email ID:</label>
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your Email ID"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Tooltip>
          </div>
          <div className="form-group-container">
            <label>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value ={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#007bff',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="login-button-container">
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleForgotPassword}>
                Forgot Password
              </Button>
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="text" onClick={handleRegistration}>
                Registration
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;