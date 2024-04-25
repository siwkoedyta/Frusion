import React from 'react';
import './Sidebar.css';
import Logo from './../logo/Logo.js';
import AdminMenu from './AdminMenu.js';
import ClientMenu from './ClientMenu.js';
import Arrow from '../arrow/Arrow.js';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ menuType, isVisible, toggleSidebar }) {
  const sidebarClass = isVisible ? 'visible' : '';
  const navigate = useNavigate();

  const handleLogout = () => {
    // Usunięcie ciasteczek
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    // Przekierowanie na stronę logowania
    navigate('/LoginPanel');
  };

  return (
    <aside className={`sidebarContainer ${sidebarClass}`}>
      <div className="sidebarHeader">
        <Logo />
        <div className="closeSidebar" onClick={toggleSidebar}><Arrow/></div>
      </div>
      {menuType === 'ADMIN' ? <AdminMenu handleLogout={handleLogout} /> : <ClientMenu handleLogout={handleLogout} />}
    </aside>
  );
}