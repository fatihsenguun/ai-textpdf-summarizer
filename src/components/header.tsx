import React from 'react';
import logo from "../images/logoai.png";

import '../css/home.css'
import { Link } from 'react-router-dom';

function Header() {


    return (
        <header className="navContainer">

            <nav className="navigationBar row">
                <div className=' col-0 col-xl-2'>
                   <img className='logo' src={logo} alt="" />
                </div>
                <div className='col-12 col-xl-8 navRight'>
                    <Link className="navItem" to="/">Home</Link>
                    <Link className="navItem" to="/notes">Notes</Link>
                </div>
                <div className='col-0 col-xl-2 '>

                </div>

            </nav>
        </header>


    )
}

export default Header