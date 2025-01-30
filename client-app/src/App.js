import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ForgotPage } from './pages/forgot';
import { LogoutPage } from './pages/logout';
import { AccessDenied } from './pages/accessDenied';
import { MainPage } from './pages/mainPage';
import { Products } from './components/Products';

function App() {
  return (
    <main>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </main> 
  );
}

export default App;