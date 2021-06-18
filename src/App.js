import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from './components/layouts/Main';
import Home from './components/pages/Home';
import Stores from './components/pages/stores/Stores';
import StoresAdd from './components/pages/stores/StoresAdd';
import StoresEdit from './components/pages/stores/StoresEdit';
import ListsShow from './components/pages/lists/ListsShow';
import ListsEdit from './components/pages/lists/ListsEdit';
import ListsAdd from './components/pages/lists/ListsAdd';
import Lists from './components/pages/lists/Lists';
import './App.css';

function App() {
  const [stores, updateStores] = useState([]);
  const [lists, updateLists] = useState([]);
  const handleAddStore = (storeId = '', newStore) => {
    updateStores([...stores, {
      id: `store-${getRand()}`, ...newStore
    }]);
  }
  const handleRemoveStore = (storeId) => {
    const newStores = stores.filter(store => store.id !== storeId);
    updateStores([...newStores]);
  }
  const handleUpdateStore = (storeId, storeData) => {
    const otherStores = stores.filter(store => store.id !== storeId)
    const updateStore = {
      id: storeId,
      ...storeData
    }
    updateStores([...otherStores, updateStore]);
  }
  const handleAddList = (list_id, listData) => {
    const newList = {
      id: `list-${getRand()}`,
      ...listData
    }
    updateLists([...lists, newList]);
  }

  const handleRemoveList = (list_id) => {
    const toKeep = lists.filter(list => list.id !== list_id);
    updateLists(toKeep);
  }
  const handleUpdateList = (list_id, listData) => {
    const updatedList = {
      id: list_id,
      ...listData
    }
    const toKeep = lists.filter(list => list.id !== list_id);
    updateLists([...toKeep, updatedList])
  }

  const getRand = () => Math.ceil(Math.random() * 999999);

  useEffect(() => {
    if (localStorage.getItem('rg-stores')) {
      updateStores(JSON.parse(localStorage.getItem('rg-stores')));
    }
    if (localStorage.getItem('rg-lists')) {
      updateLists(JSON.parse(localStorage.getItem('rg-lists')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rg-stores', JSON.stringify(stores));
  }, [stores]);
  useEffect(() => {
    localStorage.setItem('rg-lists', JSON.stringify(lists));
  }, [lists]);

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
          <Route path="/stores/new" exact={true}>
            <StoresAdd handleAddStore={handleAddStore} />
          </Route>
          <Route path="/stores/:id">
            <StoresEdit stores={stores} handleUpdateStore={handleUpdateStore} />
          </Route>
          <Route path="/lists" exact={true}>
            <Lists stores={stores} lists={lists} handleRemoveList={handleRemoveList} />
          </Route>
          <Route path="/lists/new" exact={true}>
            <ListsAdd stores={stores} handleAddList={handleAddList} />
          </Route>
          <Route path="/lists/edit/:id">
            <ListsEdit stores={stores} lists={lists} handleUpdateList={handleUpdateList} />
          </Route>
          <Route path="/lists/:id">
            <ListsShow stores={stores} lists={lists} />
          </Route>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
