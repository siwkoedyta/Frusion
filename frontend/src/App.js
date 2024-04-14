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
import { Route, Routes, useLocation } from 'react-router-dom';
import { CurrentAdminProvider } from './CurrentAdminProvider.js';

function App() {
  const location = useLocation();

  const hideSidebarPaths = ['/LoginPanel', '/RegistrationPanel'];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    <div className="App">
      <div className="content-container">
        <CurrentAdminProvider>
          {!shouldHideSidebar && <Sidebar menuType='admin'/>}
          <div className="main-content">
            <Routes>
              <Route path='/Home' element={<Home/>}/>
              <Route path='/Status' element={<Status/>}/>
              <Route path='/Fruits' element={<Fruits/>}/>
              <Route path='/Boxes' element={<Boxes/>}/>
              <Route path='/Clients' element={<Clients/>}/>
              <Route path='/LoginPanel' element={<LoginPanel/>}/>
              <Route path='/RegistrationPanel' element={<RegistrationPanel/>}/>
            </Routes>
          </div>
        </CurrentAdminProvider>
      </div>
    </div>
  );
}

export default App;