import { Link } from 'react-router-dom';
import app from '../../firebase';
import Button from '../common/Button';

export default function Main({ children }) {
  return (
    <>
      <header>
        <h1 className="logo">GroceryMapper</h1>
        <nav>
          <Link to="/">Home</Link>

          {app.auth().currentUser ?
            <>
              <Link to="/lists">Lists</Link>
              <Link to="/stores">Stores</Link>
              <Button handleOnClick={() => app.auth().signOut()} className="ml-3">Sign Out</Button>
            </> : <Link to="/login">Sign In</Link>
          }

        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        Written by Toni!
      </footer>
    </>
  )
}
