import './App.css';
import './Panels.css';
import './TransactionList.css';
import './SummaryList.css';
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
import HamburgerMenu from './components/hamburgerMenu/hamburgerMenu.js';
import WaveSmall from './components/waveSmall/WaveSmall.js';
import { authCurrent } from './api/auth/authCurrent.js';
import { useFruits } from './hooks/useFruits.js';
import { useBoxes } from './hooks/useBoxes.js';
import { useClients } from './hooks/useClients.js';

export {
  Boxes,
  Clients,
  Fruits,
  Home,
  LoginPanel,
  Status,
  RegistrationPanel,
  ClientHome,
  ClientChangePassword,
  Sidebar,
  HamburgerMenu,
  WaveSmall,
  authCurrent,
  useFruits,
  useBoxes,
  useClients
};