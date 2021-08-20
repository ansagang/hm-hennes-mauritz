import logo from '../img/logo.svg'
import home from '../img/home.svg'
import catalogicon from '../img/shopping-cart.svg'
import cart from '../img/shopping-bag.svg'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import { useEffect } from 'react';
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

function Navigation() {
    const [sticky, setSticky] = useState(false)

    useScrollPosition(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== sticky) setSticky(isShow)
        },
        [sticky]
    )

    useEffect(() => {
        if (window.scrollY === 0) {
            setSticky(true)
        }
    }, [sticky])

    const { favouritesList } = useContext(GlobalContext)

    return (
        <>
            <header className={sticky ? 'active' : null} id="header">
                <div className="container">
                    <div className="header-inner">
                        <NavLink exact to="/" className="header-logo">
                            <img src={logo} alt="logo" />
                        </NavLink>
                        <nav className='header-menu'>
                            <ul className="header-menu-list">
                                <li className="header-menu-list-item">
                                    <NavLink className="header-menu-list-link sub-info" activeStyle={{ color: '#c11a2b' }} exact to="/"><h1>Home</h1></NavLink>
                                </li>
                                <li className="header-menu-list-item">
                                    <NavLink className="header-menu-list-link sub-info" activeStyle={{ color: '#c11a2b' }} to="/catalog"><h1>Catalog</h1></NavLink>
                                </li>
                            </ul>
                        </nav>
                        <NavLink activeStyle={{ filter: 'grayscale(0%)', color:'#c11a2b' }} to="/cart" className="header-cart sub-info">
                            <img src={cart} alt="" /><h1>{favouritesList.length}</h1>
                        </NavLink>
                    </div>
                </div>
            </header>
            <div className="navigation">
                <div className="container">
                    <div className="navigation-inner">
                        <nav className='navigation-menu'>
                            <ul className="navigation-menu-list">
                                <li className="navigation-menu-list-item">
                                    <NavLink className="navigation-menu-list-link info" activeStyle={{ filter: 'grayscale(0%)' }} exact to="/"><img src={home} alt="" /></NavLink>
                                </li>
                                <li className="navigation-menu-list-item">
                                    <NavLink className="navigation-menu-list-link info" activeStyle={{ filter: 'grayscale(0%)' }} to="/catalog"><img src={catalogicon} alt="" /></NavLink>
                                </li>
                                <li className="navigation-menu-list-item">
                                    <NavLink className="navigation-menu-list-link info" activeStyle={{ filter: 'grayscale(0%)', color:'#c11a2b' }} to="/cart"><img src={cart} alt="" /><p>{favouritesList.length}</p></NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;