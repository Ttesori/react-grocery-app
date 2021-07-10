import ShowList from '../../lists/ShowList';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../common/Button';
import Loader from '../../common/Loader';
import Alert from '../../common/Alert';
import { db, auth } from '../../../firebase';
import emailjs from 'emailjs-com';
import SendList from '../../lists/SendList';
import Modal from '../../common/Modal';

export default function ListsShow({ title, handleUpdateList }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState(null);
  const [listStore, updateListStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailAlert, setEmailAlert] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendEmail = async function (e) {
    e.preventDefault();
    setModalIsOpen(false);
    setEmailAlert({ type: 'loading', msg: 'Sending email...' })
    try {
      let result = await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICEID, process.env.REACT_APP_EMAILJS_TEMPLATEID, e.target, process.env.REACT_APP_EMAILJS_USERID);

      if (result.text === 'OK') {
        setEmailAlert({ type: 'success', msg: 'Email sent successfully!' });
        setEmailSent(true);
        setTimeout(() => {
          setEmailAlert(false);
        }, 2300);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const handleCheck = (e) => {
    const id = e.target.dataset.id;
    const toKeep = list.items.filter(item => item.id !== id);
    const toUpdate = list.items.find(item => item.id === id);
    const newList = {
      ...list,
      items: [...toKeep,
      {
        ...toUpdate,
        checked: !toUpdate.checked
      }]
    }
    handleUpdateList(list.id, newList)
  }

  useEffect(() => {
    const getListFromDB = async () => {
      try {
        let db_resp = await db.collection("lists").doc(id).get();
        let list = db_resp.data();
        updateList({ ...list, id: db_resp.id });

        // once we have list, get store
        let db_resp2 = await db.collection("stores").doc(list.store_id).get();
        let store = db_resp2.data();
        updateListStore(store)
        if (list?.user_id && store?.user_id) return setIsLoading(false);
        //history.push('/dashboard');
      } catch (error) {
        console.error(error)
      }
    }
    getListFromDB();
  }, [id, history])

  useEffect(() => {
    document.title = title;
  }, [title])

  if (isLoading) return <Loader />
  return (
    <section className="p-5 mx-auto w-full max-w-screen-sm my-5">
      <h2>{list?.name}</h2>
      <h3 className="pb-3 border-b-2">{listStore.name}</h3>
      <ShowList items={list.items} store={listStore} handleCheck={(id) => handleCheck(id)} />
      {auth.currentUser &&
        <div className="border-t-2 mt-7 pt-3">
          {!emailSent && <Button className="btn-block" icon="fas fa-envelope" handleOnClick={() => setModalIsOpen(true)}>Send Grocery List</Button>}
          {emailAlert && <Alert type={emailAlert.type} message={emailAlert.msg} />}
          <Button className="w-full btn-link text-sm error mt-5" icon="fas fa-arrow-left" handleOnClick={() => history.push('/dashboard')}> Back to Dashboard</Button>
        </div>
      }
      {auth.currentUser &&
        <Modal isOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}>
          <SendList action={sendEmail} list_id={list?.id} />
        </Modal>
      }

    </section>
  )
}
