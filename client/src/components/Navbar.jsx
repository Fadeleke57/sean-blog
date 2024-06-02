import styles from './Navbar.module.css'
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import AnimatedBtn from './AnimatedBtn'

function Navbar() {
  // styling stuff
  const [showNav, setShowNav] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false)
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setShowNav(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const closeTab = () => {
    setIsActive(false)
    setMenuOpen(false)
  }
  
  //user context for conditional rendering
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("Header must be used within a UserProvider");
  }
  const { userInfo, setUserInfo } = context;

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
    closeTab()
  }

  const username = userInfo?.username;

  return (
    <div className={styles.wrapper}>
        <nav className={`${styles.navbar} ${showNav ? styles.visible : styles.hidden}`}>
            <div className={styles.container}>

                <Link to={'/'} className={styles.brand} style={{color: 'black'}} onClick={() => closeTab()}>{username ? `Hello ${username}!`: 'FernIt'}</Link>

                <div className={menuOpen ? styles.menu_open : styles.menu}> {/* if authorized user then display user menu */}

                    {username ? (
                    <ul>
                        <li><Link to="/create" onClick={() => closeTab()}>Create New Post</Link></li>
                        <li><Link onClick={logout} to="/">Logout</Link></li>
                    </ul>
                    ) : (
                    <ul>
                        <li><Link to="/login" onClick={() => closeTab()}>Login</Link></li>
                        <li><Link to="/register" onClick={() => closeTab()}>Register</Link></li>
                    </ul>
                    )}

                </div>

                <div className={styles.menu_btn}>
                <AnimatedBtn
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    isActive={isActive}
                    setIsActive={setIsActive}
                />
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar