// App.js
import React from 'react';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// import Login from './component/Login';            // Import Login component
import Register from './component/Register';      // Import Register component
import PrivateRoute from './component/PrivateRoute'; // Import PrivateRoute for route protection
// import Dashboard from './component/Dashboard';    // Import Dashboard component
import ExpenseList from './component/ExpenseList'; // Import ExpenseList component
import ExpenseForm from './component/ExpenseForm'; // Import ExpenseForm component
import { AuthProvider } from './context/AuthContext';  // Make sure the path is correct for AuthContext
// import AppRoutes from './AppRoutes';  // Import the AppRoutes component which contains all routes

function App() {
  return (
    <Router>
    <AuthProvider> {/* Wrap the app with AuthProvider for auth context */}
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/register" element={<Register />} />
      {/* <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
      <Route path="/expenses" element={<PrivateRoute><ExpenseList /></PrivateRoute>} />
      <Route path="/add" element={<PrivateRoute><ExpenseForm /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;
