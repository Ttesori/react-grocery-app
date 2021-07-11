
import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';
import logo from '../../img/logo-stacked.svg';
import logo2 from '../../img/logo-horiz.svg';
import './css/Main.css';

export default function Main({ children }) {
  const history = useHistory();
  const isLogin = ['/login', '/signup', '/reset'].includes(useLocation().pathname);
  const isHome = ['/'].includes(useLocation().pathname);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const screenSize = () => {
    setScreenWidth(window.innerWidth);
  }
  const handleSignOut = () => {
    app.auth().signOut();
    history.push('/');
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
              {((!isHome && screenWidth < 1023) || isLogin) ? <img src={logo} alt="GroceryMapper logo" /> : <img src={logo2} alt="GroceryMapper logo" />}
            </Link>
          </h1>

          <nav className="rg-nav">
            {app.auth().currentUser ?
              <Button handleOnClick={handleSignOut} icon='fas fa-power-off' className="btn-signOut">Sign Out</Button>
              : ''}
            {isHome &&
              <Button handleOnClick={() => history.push('/login')} icon='fas fa-power-off' className="btn-signOut">Sign In</Button>
            }
          </nav>

        </div>

        <span className="rg-decorations"><span className="inner-dec"></span></span>
      </header>

      <main className="rg-main">
        {children}
      </main>
      <footer className="rg-footer">
        <a href="https://github.com/Ttesori" title="Written by Toni"><i className="fab fa-github text-3xl"></i></a>
        {isHome &&
          <>
            <br />
            <a href="https://storyset.com/" className="font-italic">Illustration provided by Storyset</a>
          </>
        }
        {
          !isHome && !isLogin &&
          <>
            <br />
            <a href="https://tonitesori.dev" className="pt-3 hover:text-white">Design and Development by Toni</a>
          </>
        }
      </footer>
    </>
  )
}
