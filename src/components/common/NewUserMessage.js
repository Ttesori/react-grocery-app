import { Link } from 'react-router-dom';

export default function NewUserMessage() {
  return (
    <section className="rg-new-user">
      <h2 className='mb-2 relative'>👋 &nbsp;Howdy, Newbie!
        <span className="arrow"><i className="fas fa-arrow-right"></i></span>
      </h2>

      <p>Before we speed up your grocery shopping, <Link to="/store/new">create a new store</Link> so we know exactly how to optimize your grocery list!</p>
    </section>
  )
}
