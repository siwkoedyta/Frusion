import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate  } from 'react-router-dom';
import { Boxes, Clients, Fruits, Home, LoginPanel, Status, RegistrationPanel, ClientHome, 
  ClientChangePassword, Sidebar, HamburgerMenu, WaveSmall, authCurrent, useFruits, useBoxes, 
  useClients, useDataFetch } from './imports';

function App() {
  const location = useLocation();

  const [role, setRole] = useState(null);
  const [frusionName, setFrusionName] = useState('');
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
        setFrusionName(loggedInUser.frusionName);       
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    fetchUserRole();
  }, []);

  useDataFetch(role, setFruits, setBoxes, setClients);

  const isClient = role === 'USER';
  const isAdmin = role === 'ADMIN';

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
          {role && (!isMobile || sidebarVisible) && !shouldHideSidebar && <Sidebar menuType={role} isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />}
          <div  className={`mainContent ${isMobile && sidebarVisible ? 'sidebarVisible' : ''}`}>
            <WaveSmall />
            <div className='page'>
              <div className='mainContent'>
                <HamburgerMenu onClick={toggleSidebar} />
                <Routes>
                  {/* Trasy dostępne dla klienta */}
                  {isClient && (
                    <>
                      <Route path="/ClientHome" element={<ClientHome fruits={fruits} boxes={boxes}/>} />
                      <Route path="/ClientChangePassword" element={<ClientChangePassword />} />
                    </>
                  )}
                  {/* Trasy dostępne dla admina */}
                  {isAdmin && (
                    <>
                      <Route path="/Home" element={<Home fruits={fruits} boxes={boxes} clients={clients} frusionName={frusionName}/>} />
                      <Route path="/Status" element={<Status/>} />
                      <Route path="/Fruits" element={<Fruits fruits={fruits} onUpdate={useFruits}/>} />
                      <Route path="/Boxes" element={<Boxes boxes={boxes} onUpdate={useBoxes} />} />
                      <Route path="/Clients" element={<Clients clients={clients} onUpdate={useClients} />} />
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