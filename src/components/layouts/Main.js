import { Link } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';
import logo from '../../img/logo-stacked.svg';

export default function Main({ children }) {
  return (
    <div className="wrapper">
      <header className="rg-header">
        <h1 className="rg-logo">
          <Link to="/">
            <img src={logo} alt="GroceryMapper logo" />
          </Link>
        </h1>
        {app.auth().currentUser ?
          <nav className="rg-nav">
            <>
              <Link to="/lists">Lists</Link>
              <Link to="/stores">Stores</Link>
              <Button handleOnClick={() => app.auth().signOut()} className="ml-3">Sign Out</Button>
            </>
          </nav>
          : ''}
      </header>
      <main className="rg-main">
        {children}
      </main>
      <footer className="rg-footer">
        GroceryMapper written by Toni
      </footer>
    </div>
  )
}
