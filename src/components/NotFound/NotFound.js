import React from 'react';
import './NotFound.css'; // Create a CSS file for styles

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-message">Oops! Page Not Found</h2>
      <p className="not-found-description">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <a href="/" className="not-found-link">Go Back to Home</a>
    </div>
  );
};

export default NotFound;