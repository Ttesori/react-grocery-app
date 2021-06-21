import { Link } from 'react-router-dom';
import app from '../../firebase';

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
              <button onClick={() => app.auth().signOut()} className="btn">Sign Out</button>
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
