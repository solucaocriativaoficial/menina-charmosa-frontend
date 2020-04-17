import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Logo from '../../assets/icon.svg';
import iconSearch from '../../assets/icon-search.svg';
import iconCart from '../../assets/icon-car.svg';

export default function Header(){
    const [openMenu, setOpenMenu] = useState('');
    const [showMenu, setShowMenu] = useState('');

    useEffect(() => {
        openMenu === '' ? setShowMenu('') : setShowMenu('menu-links-moviment')
    }, [openMenu])

    return(
        <header id="header-main">
            <div className="box-logo">
                <figure>
                <Link to="/">
                    <img src={Logo} alt="Menina Charmosa"/>
                </Link>
                </figure>
            </div>
            <div id="box-field-search-cart">
                <div id="input-search">
                    <img src={iconSearch} alt=""/>
                    <input type="text" name="search"/>
                </div>
            </div>
            <div id="box-menu-links">
                <span id="cart">
                    <Link to="/box" title="Minha caixinha">
                        <img src={iconCart} alt="Caixinha"/>
                    </Link>
                </span>
                <div className="btn-menu" onClick={() => {
                    openMenu === '' ? setOpenMenu("box-menu-nav-moviment") : setOpenMenu('')
                }}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={`box-menu-nav ${openMenu}`}>
                <div className="transparent"></div>
                <nav className={`menu-links ${showMenu}`}>
                    <span>
                        <Link to="/contact">Contato</Link>
                    </span>
                    <span>
                        <Link to="/box">Minha caixinha</Link>
                    </span>
                </nav>
            </div>
        </header>
    );
}