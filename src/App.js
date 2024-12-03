import React, { useState } from 'react';
// import AppRoutes from './AppRoutes';
import Routes from './Routes';
const App = () => {
  const [userRole, setUserRole] = useState('SuperAdmin'); // Change to 'Admin' to test Admin role

  return <Routes userRole={userRole} />;
};

export default App;

