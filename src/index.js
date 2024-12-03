// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from '../App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <App /> 
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This should point to the App.js file in the same directory
import './index.css'; // Any global CSS you might have

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
