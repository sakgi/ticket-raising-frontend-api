import React, { useState, useEffect } from 'react'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { auth } from "../../firebase/firebaseconfig";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [captchaResult, setCaptchaResult] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`${num1} + ${num2}`);
    setCaptchaAnswer(num1 + num2);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Function to check if the email exists in Firestore
  const checkEmailExists = async (email) => {
    const usersRef = collection(db, 'users'); // Replace 'users' with your collection name
    const q = query(usersRef, where('Email', '==', email)); // Assuming 'Email' is the field name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if email exists
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (parseInt(captchaResult) === captchaAnswer) {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        try {
          await sendPasswordResetEmail(auth, email);
          setMessage('Password reset link has been sent to your email.');
        } catch (err) {
          setError('Failed to send password reset email. Please check the email ID.');
        }
      } else {
        setError('Email does not exist. Please check your email ID.');
      }
    } else {
      setError('Captcha is incorrect. Please try again.');
    }
  };

  const handleCaptchaRefresh = () => {
    generateCaptcha();
    setCaptchaResult('');
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Registered Email ID:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
          </div>

          <div className="input-group">
            <label>Solve the following:</label>
            <div className="captcha-question">
              <span>{captchaQuestion} = </span>
              <IconButton onClick={handleCaptchaRefresh} className="refresh-button">
                <RefreshIcon />
              </IconButton>
            </div>
            <div className="captcha-input-container">
              <input
                type="text"
                value={captchaResult}
                onChange={(e) => setCaptchaResult(e.target.value)}
                required
                placeholder="Answer"
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <p className="new-user">
          <button onClick={handleLoginClick} className="link-button">Log in</button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;