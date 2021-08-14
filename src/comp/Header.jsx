import logo from '../img/logo.svg'
import cart from '../img/Vector.png'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import useScrollPosition from '../hooks/useScrollPosition';
import { useEffect } from 'react';

function Header() {
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

    return (
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
                    <NavLink to="/cart" className="header-cart">
                        <img src={cart} alt="" />
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header;