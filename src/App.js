import React, { useState } from 'react';
import './App.css';
import { RegisterForm } from './components/Forms/Register/RegisterForm';
import { LoginForm } from './components/Forms/Login/LoginForm';
import { SidebarComponent } from './components/Sensors/Sidebar/Sidebar';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  if (isAuthenticated) {
    return (
      <SidebarComponent onLogout={() => setIsAuthenticated(false)} />
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
