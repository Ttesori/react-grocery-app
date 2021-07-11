import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { auth, db } from './firebase';
import Main from './components/layouts/Main';
import Home from './components/pages/Home';
import Landing from './components/pages/Landing';
import Loading from './components/pages/Loading';
import Stores from './components/pages/stores/Stores';
import StoresAdd from './components/pages/stores/StoresAdd';
import StoresEdit from './components/pages/stores/StoresEdit';
import ListsShow from './components/pages/lists/ListsShow';
import ListsEdit from './components/pages/lists/ListsEdit';
import ListsAdd from './components/pages/lists/ListsAdd';
import Lists from './components/pages/lists/Lists';
import NewUserMessage from './components/common/NewUserMessage';
import './App.css';
import Reset from './components/pages/Reset';

function App() {
  const [stores, updateStores] = useState(null);
  const [storesAlert, updateStoresAlert] = useState(null);
  const [listsAlert, updateListsAlert] = useState(null);
  const [lists, updateLists] = useState(null);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const pageTitle = ' | GroceryMapper';

  /* Stores */
  // Add Store
  const handleAddStore = async (storeId = '', newStore) => {
    const store = { user_id: userId, ...newStore }
    try {
      updateStoresAlert({ type: 'loading', message: 'Saving store...' });
      let resp = await db.collection("stores").add(store);
      if (resp) {
        updateStores([...stores, { id: resp.id, color: stores.length, ...store }]);
        updateStoresAlert({ type: 'success', message: 'Store added successfully!' });
        setTimeout(() => {
          updateStoresAlert(null);
        }, 2700);
      }
    } catch (error) {
      updateStoresAlert({ type: 'error', message: error })
    }
  }
  // Remove Store
  const handleRemoveStore = (e, storeId) => {
    const el = e.target.parentElement.parentElement;
    const newStores = stores.filter(store => store.id !== storeId);
    updateStoresAlert({ type: 'loading', message: 'Removing store...' });
    removeStoreFromDB(storeId, newStores, el);
  }
  const removeStoreFromDB = async (store_id, newStores, el) => {
    try {
      let db_resp = await db.collection("stores").doc(store_id).delete();
      if (db_resp === undefined) {
        updateStoresAlert({ type: 'success', message: 'Store removed successfully!' });
        updateStores([...newStores]);
        setTimeout(() => {
          updateStoresAlert(null);
        }, 2700);
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
      color: stores.find(store => store.id === storeId).color,
      ...storeData
    }
    updateStoresAlert({ type: 'loading', message: 'Updating store...' });
    updateStoreInDB(storeId, { user_id: userId, ...storeData }, () => updateStores([...otherStores, updateStore]));
  }
  const updateStoreInDB = async (store_id, storeData, cb) => {
    try {
      let db_resp = await db.collection("stores").doc(store_id).set(storeData);
      if (db_resp === undefined) {
        cb();
        updateStoresAlert({ type: 'success', message: 'Store updated!' });
        setTimeout(() => {
          updateStoresAlert(null);
        }, 2700);
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
        }, 2700);
      }
    } catch (error) {
      updateListsAlert({ type: 'error', message: error })
    }
  }
  // Remove List
  const handleRemoveList = (e, list_id) => {
    const el = e.target.parentElement.parentElement;
    const toKeep = lists.filter(list => list.id !== list_id);
    updateListsAlert({ type: 'loading', message: 'Removing list...' });
    removeListFromDB(list_id, toKeep, el);
  }
  const removeListFromDB = async (list_id, newLists, el) => {
    try {
      let db_resp = await db.collection("lists").doc(list_id).delete();
      if (db_resp === undefined) {
        updateListsAlert({ type: 'success', message: 'List removed successfully!' });
        updateLists([...newLists]);

        setTimeout(() => {
          updateListsAlert(null);
        }, 2700);
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
    if (auth.currentUser) {
      updateListInDB(list_id, listData, () => {
        updateLists([...toKeep, updatedList])
        updateListsAlert({ type: 'success', message: 'List updated!' });
        setTimeout(() => {
          updateListsAlert(null);
        }, 2700);
      });
    }
  }
  const handleUpdateListShow = (list_id, listData) => {
    const toKeep = lists.filter(list => list.id !== list_id);
    const updatedList = {
      id: list_id,
      ...listData
    }
    if (auth.currentUser) {
      updateListInDB(list_id, listData, () => updateLists([...toKeep, updatedList]))
    }
  }
  const updateListInDB = async (list_id, listData, callback) => {
    try {
      let list = { user_id: userId, ...listData };
      let db_resp = await db.collection("lists").doc(list_id).set(list);
      if (db_resp === undefined) {
        callback();
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
        setIsLoading(true);
      } else {
        setUserId('');
        setIsLoading(false);
      }
    });
  }, []);

  // Load data from DB on app start
  useEffect(() => {
    const getDataFromDB = async () => {
      try {
        let db_resp = await db.collection("stores").where("user_id", "==", userId).get();
        let stores = [];
        db_resp.forEach((doc) => {
          const storeData = {
            id: doc.id,
            color: stores.length,
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
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    }
    if (!userId) return;
    getDataFromDB();
  }, [userId])

  useEffect(() => {
    if (isLoading && stores?.length > -1 && lists?.length > -1) {
      setIsLoading(false);
    }
  }, [stores, lists, isLoading])

  if (isLoading) return <Loading />

  return (
    <Router>
      {!isLoading &&
        <Main>
          <Switch>
            <Route path="/" exact={true}>
              {userId && <Redirect to="/dashboard" />}
              <Landing title={`Level Up Your Grocery Shopping ${pageTitle}`} />
            </Route>
            <Route path="/login" exact={true}>
              {userId && <Redirect to="/dashboard" />}
              <Home title={`Login ${pageTitle}`} />
            </Route>
            <Route path="/reset" exact={true}>
              {userId && <Redirect to="/dashboard" />}
              <Reset title={`Reset Password ${pageTitle}`} />
            </Route>
            <Route path="/lists/view/:id">
              <ListsShow title={`View List ${pageTitle}`} handleUpdateList={handleUpdateListShow} />
            </Route>
            <Route path="/stores" exact={true}>
              {!userId && <Redirect to="/" />}
              <Stores title={`My Stores ${pageTitle}`} lists={lists} stores={stores} handleRemoveStore={handleRemoveStore} alert={storesAlert} />
            </Route>
            <Route path="/stores/new" exact={true}>
              {!userId && <Redirect to="/" />}
              <StoresAdd title={`Add New Store ${pageTitle}`} handleAddStore={handleAddStore} />
            </Route>
            <Route path="/stores/:id">
              {!userId && <Redirect to="/" />}
              <StoresEdit title={`Edit Store ${pageTitle}`} stores={stores} handleUpdateStore={handleUpdateStore} />
            </Route>
            <Route path="/dashboard" exact={true}>
              {!userId && <Redirect to="/" />}
              {stores?.length > 0 ?
                <Lists stores={stores} lists={lists} handleRemoveList={handleRemoveList} alert={listsAlert} />
                : <NewUserMessage />
              }
              <Stores title={`User Dashboard ${pageTitle}`} lists={lists} stores={stores} handleRemoveStore={handleRemoveStore} alert={storesAlert} />
            </Route>
            <Route path="/lists/new">
              <ListsAdd title={`New List ${pageTitle}`} stores={stores} handleAddList={handleAddList} />
            </Route>

            <Route path="/lists/edit/:id">
              <ListsEdit title={`Edit List ${pageTitle}`} stores={stores} lists={lists} handleUpdateList={handleUpdateList} />
            </Route>
          </Switch>
        </Main>}
    </Router>
  );
}

export default App;
