import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, db } from './firebase';
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
  const [storesAlert, updateStoresAlert] = useState(null);
  const [lists, updateLists] = useState([]);
  const [userId, setUserId] = useState('');

  const getRand = () => Math.ceil(Math.random() * 999999);

  /* Stores */
  // Add Store
  const handleAddStore = async (storeId = '', newStore) => {
    const store = { user_id: userId, ...newStore }
    try {
      updateStoresAlert({ type: 'loading', message: 'Saving store...' });
      let resp = await db.collection("stores").add(store);
      if (resp) {
        updateStores([...stores, { id: resp.id, ...store }]);
        updateStoresAlert({ type: 'success', message: 'Store added successfully!' });
        setTimeout(() => {
          updateStoresAlert(null);
        }, 3000);
      }
    } catch (error) {
      updateStoresAlert({ type: 'error', message: error })
    }
  }
  // Remove Store
  const handleRemoveStore = (storeId) => {
    const newStores = stores.filter(store => store.id !== storeId);
    updateStoresAlert({ type: 'loading', message: 'Removing store...' });
    removeStoreFromDB(storeId, newStores);
  }
  const removeStoreFromDB = async (store_id, newStores) => {
    try {
      let db_resp = await db.collection("stores").doc(store_id).delete();
      if (db_resp === undefined) {
        updateStores([...newStores]);
        updateStoresAlert({ type: 'success', message: 'Store removed successfully!' });
        setTimeout(() => {
          updateStoresAlert(null);
        }, 3000);
      }
    } catch (error) {
      updateStoresAlert({ type: 'error', message: 'Error removing store!' });
      console.error(error);
    }
  }

  // Update Store
  const handleUpdateStore = (storeId, storeData) => {
    const otherStores = stores.filter(store => store.id !== storeId)
    const updateStore = {
      id: storeId,
      user_id: userId,
      ...storeData
    }
    updateStoresAlert({ type: 'loading', message: 'Updating store...' });
    updateStoreInDB(storeId, storeData, () => updateStores([...otherStores, updateStore]));
  }
  const updateStoreInDB = async (store_id, storeData, cb) => {
    try {
      console.log('updating store', store_id);
      let db_resp = await db.collection("stores").doc(store_id).set(storeData);
      if (db_resp === undefined) {
        cb();
        updateStoresAlert({ type: 'success', message: 'Store updated!' });
        setTimeout(() => {
          updateStoresAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      updateStoresAlert({ type: 'error', message: 'Error updating store...' });
    }
  }

  /* Lists */
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

  useEffect(() => {
    if (localStorage.getItem('rg-lists')) {
      updateLists(JSON.parse(localStorage.getItem('rg-lists')));
    }
  }, []);

  // Set user ID on app start
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        setUserId('');
      }
    });
  }, []);

  // Load data from DB on app start
  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        let db_resp = await db.collection("stores").where("user_id", "==", userId).get();
        let stores = [];
        db_resp.forEach(doc => {
          const storeData = {
            id: doc.id,
            ...doc.data()
          }
          stores.push(storeData);
        });
        updateStores(stores);
      } catch (error) {
        console.log(error)
      }
    }
    getDataFromDB();
  }, [userId])

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
            <Stores stores={stores} handleRemoveStore={handleRemoveStore} alert={storesAlert} />
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
