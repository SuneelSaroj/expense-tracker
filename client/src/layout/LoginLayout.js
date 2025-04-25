import React from 'react';
import { Outlet } from 'react-router-dom';

function LoginLayout() {
  return (
    <div className="loginPage">
      <Outlet />
    </div>
  );
}

export default LoginLayout;

