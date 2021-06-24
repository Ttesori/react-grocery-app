import { Link } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';

export default function Main({ children }) {
  return (
    <>
      <header className="rg-header">
        <h1 className="rg-logo">GroceryMapper</h1>
        <nav className="rg-nav">
          {app.auth().currentUser ?
            <>
              <Link to="/lists">Lists</Link>
              <Link to="/stores">Stores</Link>
              <Button handleOnClick={() => app.auth().signOut()} className="ml-3">Sign Out</Button>
            </> : ''
          }

        </nav>
      </header>
      <main className="rg-main">
        {children}
      </main>
      <footer className="rg-footer">
        Written by Toni!
      </footer>
    </>
  )
}
