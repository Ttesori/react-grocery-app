import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './components/layouts/Main';
import Home from './components/pages/Home';
import Stores from './components/pages/Stores';
import StoresAdd from './components/pages/StoresAdd';
import './App.css';

function App() {
  const [stores, updateStores] = useState([]);
  const handleAddStore = (newStore) => {
    console.log(newStore);
    updateStores([...stores, {
      id: `store-${stores.length}`, ...newStore
    }]);
  }
  const handleRemoveStore = (storeId) => {
    const newStores = stores.filter(store => store.id !== storeId);
    updateStores([...newStores]);
  }

  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/stores" exact={true}>
            <Stores stores={stores} handleRemoveStore={handleRemoveStore} />
          </Route>
          <Route path="/stores/new">
            <StoresAdd handleAddStore={handleAddStore} />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
