import './Menu.css'
import CustomLink from './CustomLink'

export default function AdminMenu(){
    return(
        <ul className="menu">
            <CustomLink id="home" to='/Home'>Home</CustomLink>
            <CustomLink id="statusFrusion" to='/Status'>Status Frusion</CustomLink>
            <CustomLink id="fruits" to='/Fruits'>Fruits</CustomLink>
            <CustomLink id="boxes" to='/Boxes'>Boxes</CustomLink>
            <CustomLink id="clients" to='/Clients'>Clients</CustomLink>
            <CustomLink id="logOut" to='/LoginPanel'>Log out</CustomLink>
        </ul>
    )
}