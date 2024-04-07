import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { IoMdCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import logo from '../../Assets/logo.png';
import logout from '../../Assets/logout.jpg'
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



export default function Navbar() {


  const [menuOpen, setMenuOpen] = useState(false)


  const navigate = useNavigate();
 
     
  const handleLogoutClick = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
   
    navigate('/Signin/Signin');
    
  };

  return (
    <section className='NavBarSection'>
      {/* <header className='header flex'>

        <div className='logodiv'>
          
          <img src={logo} alt='logo'></img>
       
        </div>
       

        <div className={`navBar expand-sm ${active ? 'activeNavBar' : ''}`} >
          
          <ul className="navLists grid">
          
          <li className="navitem">
            <Link className="navlink" to="/Home">HOME</Link>
          </li>
           
            <li className="navitem">
            <Link className="navlink" to="Favourite/Favourite">FAVOURITE</Link>
            </li> 
            
                      
            <div>
                <img onClick={handleLogoutClick} src={logout} className='logout-img' alt='logout'/>
            </div>
                      
          </ul> 


          <div onClick={closeNavbar}  className="closeNavbar">
            <IoMdCloseCircle className='close-icon'/>
          </div>
          

        </div>
  
        <div className='togglenavbar expand-sm' onClick={shownav}>
          <TbGridDots className='list-icon' />
        </div>
        

      </header> */}
<div><img src={logo} className='logo-nav-2' alt='img'/></div>


<div className='navbar'>
            <div>
                <img src={logo} className='logo' alt='img'/>
               
            </div>

            <div className='nav-toggle' onClick={() =>{
                setMenuOpen(!menuOpen)
            }}>
                <span/>
                <span/>
                <span/>
            </div>

            <div className={menuOpen ? "open" : "" } id='nav-all-buttons'>
                <Link className='nav-buttons' to='/Home'>HOME</Link>
                <Link className='nav-buttons' to="Favourite/Favourite">FAVOURITE</Link>
                <img src={logout} onClick={handleLogoutClick} className='logout-in' alt='icon'/>
            </div>
            
            <div>
                <img src={logout} onClick={handleLogoutClick} className='logout' alt='icon'/>
            </div>
        </div>

    </section>
  )
}














