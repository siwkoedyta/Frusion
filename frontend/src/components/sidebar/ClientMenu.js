import './Menu.css'
import CustomLink from './CustomLink'

export default function ClientMenu(){
    return(
        <ul className="menu">
            <CustomLink id="home" to='/ClientHome'>Home</CustomLink>
            <CustomLink id="changePassword" to='/ClientChangePassword'>Change password</CustomLink>
            <CustomLink id="logOut" to='/LoginPanel'>Log out</CustomLink>
        </ul>
    )
}

