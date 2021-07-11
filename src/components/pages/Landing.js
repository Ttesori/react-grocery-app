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
          <p><strong>Hate how long it takes to shop?</strong> Tired of forgetting items? Use GroceryMapper to shop faster so you can get back to what you'd rather be doing!</p>
          <Button className="btn-block" title="Get Started!"
            handleOnClick={() => history.push('/login')}>Get Started <i className="fas fa-arrow-right"></i></Button>
          <picture className="rg-illustration">
            <img src={shopping} alt="Cartoon of a woman checking out groceries." />
          </picture>
        </div>
      </section>
      <section className="rg-how">
        <div className="container">
          <h2><span>How It Works <i className="fas fa-arrow-down pl-2"></i></span></h2>
          <ul className="rg-ul-cols">
            <li>
              <span className="num">1</span>
              <h3><i className="fas fa-store text-secondary pr-2"></i> Create A Store</h3>
              <picture className="rg-img-scroll">
                <img src="/img/how-1-scroll.png" alt="How to Process Step 1" />
              </picture>
              <p><strong>Everyone shops differently</strong>, so add, edit, and reorder the sections of your local stores to match your personal shopping order.</p>
            </li>
            <li>
              <span className="num">2</span>
              <h3><i className="fas fa-list text-secondary pr-2"></i> Write Your List</h3>
              <picture className="rg-img-scroll">
                <img src="/img/how-2-scroll.png" alt="How to Process Step 2" />
              </picture>
              <p><strong>When you're ready to shop,</strong> add items to your list. GroceryMapper automatically puts them in order for the store you've selected.</p>
            </li>
            <li>
              <span className="num">3</span>
              <h3><i className="fas fa-shopping-cart text-secondary pr-2" ></i> Shop Speedily</h3>
              <picture className="rg-img-scroll">
                <img src="/img/how-3-scroll.png" alt="How to Process Step 3" />
              </picture>
              <p><strong>Bring GroceryMapper</strong> to the store and follow your custom grocery map &ndash; check items off as you go and you won't forget a thing!</p>
            </li>

          </ul>
        </div>
      </section>
    </>
  )
}
