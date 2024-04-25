import './Menu.css';
import CustomLink from './CustomLink';

export default function ClientMenu({ handleLogout }) {
  return (
    <ul className="menu">
      <CustomLink id="home" to='/ClientHome'>Home</CustomLink>
      <CustomLink id="changePassword" to='/ClientChangePassword'>Change password</CustomLink>
      <li id="logOut" onClick={handleLogout}>Log out</li>
    </ul>
  );
}