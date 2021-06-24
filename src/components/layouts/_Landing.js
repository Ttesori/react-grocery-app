import './css/Landing.css';
import logo from '../../img/logo-stacked.svg';

import { Link } from 'react-router-dom';

export default function Landing({ children }) {
  return (
    <div className="wrapper flex place-items-center h-screen">
      <div className="container">
        <header className="rg-header">
          <h1 className="rg-logo"><Link to="/"><img src={logo} alt="GroceryMapper logo" /></Link></h1>
        </header>
        <main className="rg-main">
          {children}
        </main>
        <footer className="rg-footer">

        </footer>
      </div>
    </div>
  )
}
