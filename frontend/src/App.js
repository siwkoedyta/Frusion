import './App.css';
import './Panels.css'
import './TransactionList.css'
import './SummaryList.css'
import Wave from './components/wave/Wave.js';
import Boxes from './pages/admin/boxes/Boxes.js';
import Clients from './pages/admin/clients/Clients.js';
import Fruits from './pages/admin/fruits/Fruits.js';
import Home from './pages/admin/home/Home.js';
import LoginPanel from './pages/panels/loginPanel/LoginPanel.js';
import Status from './pages/admin/status/Status.js';
import RegistrationPanel from './pages/panels/registrationPanel/RegistrationPanel.js';
import ClientHome from './pages/client/clientHome/ClientHome.js';
import ClientChangePassword from './pages/client/clientChangePassword/ClientChangePassword.js';
import Sidebar from './components/sidebar/Sidebar.js';
import { Route, Routes, useLocation, Navigate  } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { getAllFruits } from './api/fruit/getAllFruits';
import { getAllBoxes } from './api/box/getAllBoxes.js';
import { getAllClients } from './api/client/getAllClients.js';

import HamburgerMenu from './components/hamburgerMenu/hamburgerMenu.js';
import WaveSmall from './components/waveSmall/WaveSmall.js'
import { authCurrent } from './api/auth/authCurrent.js';


function App() {
  const location = useLocation();

  const [role, setRole] = useState(null);
  const hideSidebarPaths = ['/LoginPanel', '/RegistrationPanel'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  const [fruits, setFruits] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [clients, setClients] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile)

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const loggedInUser = await authCurrent();
        setRole(loggedInUser.role);        
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    fetchUserRole();
  }, []);

  const isClient = role === 'USER';
  const isAdmin = role === 'ADMIN';

useEffect(() => {
  async function fetchData() {
    try {
      if (role === 'ADMIN') {
        await Promise.all([
          refreshFruits(),
          refreshBoxes(),
          refreshClients()
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (role) {
    fetchData();
  }
}, [role]);

  useEffect(() => {
    setSidebarVisible(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!sidebarVisible);
      const body = document.getElementsByTagName('body')[0];
      if (sidebarVisible) {
        body.classList.remove('sidebarOpen');
      } else {
        body.classList.add('sidebarOpen');
      }
    }
  };

  const refreshFruits = () => {
    getAllFruits()
      .then(data => setFruits(data.filter(fruit => !fruit.archived)))
      .catch(errors => alert(errors));
  };

  const refreshBoxes = () => {
    getAllBoxes()
      .then(data => setBoxes(data.filter(box => !box.archived)))
      .catch(errors => alert(errors));
  };

  const refreshClients = () => {
    getAllClients()
      .then(data => setClients(data.filter(client => !client.archived)))
      .catch(errors => alert(errors));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      setSidebarVisible(!isMobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div className="App">
      <div className="content-container">
  
          {role && !shouldHideSidebar && <Sidebar menuType={role} isVisible={!isMobile || sidebarVisible} toggleSidebar={toggleSidebar}></Sidebar>}
          <div  className={`mainContent ${isMobile && sidebarVisible ? 'sidebarVisible' : ''}`}>
            <WaveSmall />
            <div className='page'>
              <div className='mainContent'>
                <HamburgerMenu onClick={toggleSidebar} />
                <Routes>
                  {/* Trasy dostępne dla klienta */}
                  {isClient && (
                    <>
                      <Route path="/ClientHome" element={<ClientHome />} />
                      <Route path="/ClientChangePassword" element={<ClientChangePassword />} />
                    </>
                  )}
                  {/* Trasy dostępne dla admina */}
                  {isAdmin && (
                    <>
                      <Route path="/Home" element={<Home />} />
                      <Route path="/Status" element={<Status />} />
                      <Route path="/Fruits" element={<Fruits fruits={fruits} onUpdate={refreshFruits} />} />
                      <Route path="/Boxes" element={<Boxes boxes={boxes} onUpdate={refreshBoxes} />} />
                      <Route path="/Clients" element={<Clients clients={clients} onUpdate={refreshClients} />} />
                    </>
                  )}
                  {/* Wspólne trasy */}
                  <Route path="/LoginPanel" element={<LoginPanel />} />
                  <Route path="/RegistrationPanel" element={<RegistrationPanel />} />
                  {/* Przekierowanie na odpowiednią trasę po zalogowaniu */}
                  <Route path="/" element={role ? <Navigate to={isClient ? "/ClientHome" : "/Home"} /> : <Navigate to="/LoginPanel" />} />
                </Routes> 
              </div>
            </div>
          </div>
  
      </div>
    </div>
  );
}

export default App;
