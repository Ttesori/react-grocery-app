import { Link } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';
import logo from '../../img/logo-stacked.svg';
import './css/Main.css';

export default function Main({ children }) {
  return (
    <>
      <header className="rg-header">
        <h1 className="rg-logo">
          <Link to="/">
            <img src={logo} alt="GroceryMapper logo" />
          </Link>
        </h1>
        {app.auth().currentUser ?
          <nav className="rg-nav">
            <>
              <Button handleOnClick={() => app.auth().signOut()} icon='fas fa-power-off' className="ml-3 btn-signOut">Sign Out</Button>
            </>
          </nav>
          : ''}
        <span className="rg-decorations"><span className="inner-dec"></span></span>
      </header>

      <main className="rg-main">
        {children}
      </main>
      <footer className="rg-footer">
        GroceryMapper written by Toni
      </footer>
    </>
  )
}
