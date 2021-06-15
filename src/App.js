import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './components/layouts/Main';
import Home from './components/pages/Home';
import Stores from './components/pages/Stores';
import './App.css';

import data from './data';

function App() {
  const [items, updateItems] = useState(data);
  const [itemsOrder, updateItemsOrder] = useState(data.map(item => item.id));

  const handleList1OnDragEnd = (newItems, newItemsOrder) => {
    updateItems(newItems);
    updateItemsOrder(newItemsOrder);
  }

  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/stores">
            <Stores items={items} itemsOrder={itemsOrder} handleOnDragEnd={handleList1OnDragEnd} />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
