import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Landing.css';
import shopping from '../../img/shopping.svg';
import Button from '../common/Button';

export default function Landing({ title }) {
  const history = useHistory();
  useEffect(() => {
    document.title = title;
    document.body.className = 'page-landing';
  }, [title])
  return (
    <>
      <section className="rg-hero">
        <div className="container">
          <h2>Spend Less Time Grocery Shopping!</h2>
          <p><strong>Hate how long it takes to shop?</strong> Tired of forgetting items? Use GroceryMapper to shop faster and get back to more exciting activities!</p>
          <Button className="btn-block" title="Get Started!"
            handleOnClick={() => history.push('/login')}>Get Started <i className="fas fa-arrow-right"></i></Button>
          <picture className="rg-illustration">
            <img src={shopping} alt="Cartoon of a woman checking out groceries." />
          </picture>
        </div>
      </section>
      <section className="rg-how">
        <div className="container">
          <h2><span>How It Works</span></h2>
          <ul className="rg-ul-cols">
            <li>
              <h3>1. Create A Store</h3>
              <p>Everyone shops differently, so add, edit, and drag-and-drop the sections of your local stores to match your own personal shopping order.</p>
            </li>
            <li>
              <h3>2. Write Your List</h3>
              <p>When you're ready to shop, add items to your list. GroceryMapper automatically puts them in the correct order for the store you've selected.</p>
            </li>
            <li>
              <h3>3. Shop Speedily</h3>
              <p>Bring GroceryMapper along to the store and follow your personalized grocery map - check items off as you go and you won't forget a thing!</p>
            </li>

          </ul>
        </div>
      </section>
    </>
  )
}
