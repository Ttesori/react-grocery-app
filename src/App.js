import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
  const [listsAlert, updateListsAlert] = useState(null);
  const [lists, updateLists] = useState([]);
  const [userId, setUserId] = useState('');

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
  // Add List
  const handleAddList = async (list_id, listData) => {
    const list = { user_id: userId, ...listData }
    try {
      updateListsAlert({ type: 'loading', message: 'Saving list...' });
      let resp = await db.collection("lists").add(list);
      if (resp) {
        updateLists([...lists, { id: resp.id, ...list }]);
        updateListsAlert({ type: 'success', message: 'List added successfully!' });
        setTimeout(() => {
          updateListsAlert(null);
        }, 3000);
      }
    } catch (error) {
      updateListsAlert({ type: 'error', message: error })
    }
  }
  // Remove List
  const handleRemoveList = (list_id) => {
    const toKeep = lists.filter(list => list.id !== list_id);
    updateListsAlert({ type: 'loading', message: 'Removing list...' });
    console.log('removing', list_id);
    removeListFromDB(list_id, toKeep);
  }
  const removeListFromDB = async (list_id, newLists) => {
    try {
      let db_resp = await db.collection("lists").doc(list_id).delete();
      if (db_resp === undefined) {
        updateLists([...newLists]);
        updateListsAlert({ type: 'success', message: 'List removed successfully!' });
        setTimeout(() => {
          updateListsAlert(null);
        }, 3000);
      }
    } catch (error) {
      updateListsAlert({ type: 'error', message: 'Error removing list!' });
      console.error(error);
    }
  }

  // Update List
  const handleUpdateList = (list_id, listData) => {
    const toKeep = lists.filter(list => list.id !== list_id);
    const updatedList = {
      id: list_id,
      ...listData
    }
    updateListsAlert({ type: 'loading', message: 'Updating list...' });
    updateListInDB(list_id, listData, () => updateLists([...toKeep, updatedList]))
  }
  const updateListInDB = async (list_id, listData, callback) => {
    try {
      console.log('updating list', list_id);
      let db_resp = await db.collection("lists").doc(list_id).set({ user_id: userId, ...listData });
      if (db_resp === undefined) {
        callback();
        updateListsAlert({ type: 'success', message: 'List updated!' });
        setTimeout(() => {
          updateListsAlert(null);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      updateListsAlert({ type: 'error', message: 'Error updating list...' });
    }
  }

  // Set user ID on app start
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
      if (!userId) return;
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

        let db_resp2 = await db.collection("lists").where("user_id", "==", userId).get();
        let lists = [];
        db_resp2.forEach(doc => {
          const listData = {
            id: doc.id,
            ...doc.data()
          }
          lists.push(listData);
        });
        updateLists(lists);
      } catch (error) {
        console.log(error)
      }
    }
    getDataFromDB();
  }, [userId])

  return (
    <Router>
      <Main>
        <Switch>
          <Route path="/" exact={true}>
            {userId && <Redirect to="/lists" />}
            <Home />
          </Route>
          <Route path="/stores" exact={true}>
            {!userId && <Redirect to="/" />}
            <Stores lists={lists} stores={stores} handleRemoveStore={handleRemoveStore} alert={storesAlert} />
          </Route>
          <Route path="/stores/new" exact={true}>
            {!userId && <Redirect to="/" />}
            <StoresAdd handleAddStore={handleAddStore} />
          </Route>
          <Route path="/stores/:id">
            {!userId && <Redirect to="/" />}
            <StoresEdit stores={stores} handleUpdateStore={handleUpdateStore} />
          </Route>
          <Route path="/lists" exact={true}>
            {!userId && <Redirect to="/" />}
            <Lists stores={stores} lists={lists} handleRemoveList={handleRemoveList} alert={listsAlert} />
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
