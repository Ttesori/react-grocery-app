import { Link } from 'react-router-dom';

export default function Main({ children }) {
  return (
    <>
      <header>
        <h1 className="logo">GroceryMapper</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/stores">Stores</Link>
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
