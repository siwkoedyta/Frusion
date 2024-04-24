import React from 'react';
import './Sidebar.css';
import Logo from './../logo/Logo.js';
import AdminMenu from './AdminMenu.js';
import ClientMenu from './ClientMenu.js';
import Arrow from '../arrow/Arrow.js';

export default function Sidebar({ menuType, isVisible, toggleSidebar }) {
  const sidebarClass = isVisible ? 'visible' : '';

  return (
    <aside className={`sidebarContainer ${sidebarClass}`}>
      <div className="sidebarHeader">
        <Logo />
        <div className="closeSidebar" onClick={toggleSidebar}><Arrow/></div>
      </div>
      {menuType === 'ADMIN' ? <AdminMenu /> : <ClientMenu />}
    </aside>
  );
}