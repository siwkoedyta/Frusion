import React, { useState, useEffect } from 'react';
import RabbitMQConsumer from './RabbitMQConsumer';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Boxes, Clients, Fruits, Home, LoginPanel, Status, RegistrationPanel, ClientHome,
  ClientChangePassword, Sidebar, HamburgerMenu, WaveSmall, authCurrent, useFruits, useBoxes,
  useClients } from './imports';

function App() {
  const location = useLocation();

  const [auth, setAuth] = useState(null);

  const hideSidebarPaths = ['/LoginPanel', '/RegistrationPanel'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  const [fruits, refreshFruits] = useFruits([]);
  const [boxes, refreshBoxes] = useBoxes();
  const [clients, refreshClients] = useClients([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile)

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const loggedInUser = await authCurrent();
        setAuth(loggedInUser);
        await refreshBoxes(loggedInUser.role);
        await refreshFruits(loggedInUser.role);
        await refreshClients(loggedInUser.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }
    fetchUserRole();
  }, []);

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
      <RabbitMQConsumer />
      <div className="content-container">
        {auth?.role && (!isMobile || sidebarVisible) && !shouldHideSidebar && <Sidebar menuType={auth?.role} isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />}
        <div className={`mainContent ${isMobile && sidebarVisible ? 'sidebarVisible' : ''}`}>
          <WaveSmall />
          <div className='page'>
            <div className='mainContent'>
              {!shouldHideSidebar && <HamburgerMenu onClick={toggleSidebar} />}
              <Routes>
                {/* Trasy dostępne dla klienta */}
                {auth?.role === "USER" && (
                  <>
                    <Route path="/ClientHome" element={<ClientHome fruits={fruits} boxes={boxes} />} />
                    <Route path="/ClientChangePassword" element={<ClientChangePassword userId={auth?.id} />} />
                  </>
                )}
                {/* Trasy dostępne dla admina */}
                {auth?.role === "ADMIN" && (
                  <>
                    <Route path="/Home" element={<Home fruits={fruits} boxes={boxes} clients={clients} frusionName={auth?.frusionName} />} />
                    <Route path="/Status" element={<Status />} />
                    <Route path="/Fruits" element={<Fruits fruits={fruits} onUpdate={() => refreshFruits(auth?.role)} />} />
                    <Route path="/Boxes" element={<Boxes boxes={boxes} onUpdate={() => refreshBoxes(auth?.role)} />} />
                    <Route path="/Clients" element={<Clients clients={clients} onUpdate={() => refreshClients(auth?.role)} />} />
                  </>
                )}
                {/* Wspólne trasy */}
                <Route path="/LoginPanel" element={<LoginPanel />} />
                <Route path="/RegistrationPanel" element={<RegistrationPanel />} />
                {/* Przekierowanie na odpowiednią trasę po zalogowaniu */}
                <Route path="/" element={auth ? <Navigate to={auth?.role === "USER" ? "/ClientHome" : "/Home"} /> : <Navigate to="/LoginPanel" />} />
              </Routes>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;