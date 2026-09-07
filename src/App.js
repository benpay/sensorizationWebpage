import React, { useState } from 'react';
import './App.css';
import { RegisterForm } from './components/Forms/Register/RegisterForm';
import { LoginForm } from './components/Forms/Login/LoginForm';
import { SidebarComponent } from './components/Sensors/Sidebar/Sidebar';
import { logout } from './services/api';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setIsAuthenticated(false);
    }
  };

  if (isAuthenticated) {
    return (
      <SidebarComponent onLogout={handleLogout} />
    );
  }

  return (
    <div className="App">
      {isLogin ? (
        <LoginForm
          onSwitchForm={toggleForm}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      ) : (
        <RegisterForm onSwitchForm={toggleForm} />
      )}
    </div>
  );
}

export default App;
