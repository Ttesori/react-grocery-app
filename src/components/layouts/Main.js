
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';
import logo from '../../img/logo-stacked.svg';
import logo2 from '../../img/logo-horiz.svg';
import './css/Main.css';

export default function Main({ children }) {
  const isHome = useLocation().pathname === '/';
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const screenSize = () => {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', screenSize);
  }, [])

  return (
    <>
      <header className="rg-header">
        <div className="container">
          <h1 className="rg-logo">
            <Link to="/">
              {(screenWidth < 1023 || isHome) ? <img src={logo} alt="GroceryMapper logo" /> : <img src={logo2} alt="GroceryMapper logo" />}
            </Link>
          </h1>
          {app.auth().currentUser ?
            <nav className="rg-nav">
              <>
                <Button handleOnClick={() => app.auth().signOut()} icon='fas fa-power-off' className="btn-signOut">Sign Out</Button>
              </>
            </nav>
            : ''}
        </div>

        <span className="rg-decorations"><span className="inner-dec"></span></span>
      </header>

      <main className="rg-main">
        {children}
      </main>
      <footer className="rg-footer">
        <a href="https://github.com/Ttesori"><i className="fab fa-github text-3xl"></i></a>
      </footer>
    </>
  )
}
