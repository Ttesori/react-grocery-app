import ShowList from '../../lists/ShowList';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../common/Button';
import Loader from '../../common/Loader';
import { db, auth } from '../../../firebase';
import emailjs from 'emailjs-com';
import SendList from '../../lists/SendList';

export default function ListsShow({ title }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState(null);
  const [listStore, updateListStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);



  const sendEmail = async function (e) {
    e.preventDefault();
    setEmailLoading(true);
    try {
      let result = await emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICEID, process.env.REACT_APP_EMAILJS_TEMPLATEID, e.target, process.env.REACT_APP_EMAILJS_USERID);
      if (result.text === 'OK') {
        setEmailSent(true);
        setEmailLoading(false);
      }

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    const getListFromDB = async () => {
      try {
        let db_resp = await db.collection("lists").doc(id).get();
        let list = db_resp.data();
        updateList({ ...list, id: db_resp.id });
        console.log(list);

        // once we have list, get store
        let db_resp2 = await db.collection("stores").doc(list.store_id).get();
        let store = db_resp2.data();
        updateListStore(store)
        console.log(store);
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
    <section className="p-5 mt-5">
      <h2 className="pb-3">{list?.name}  <br />{listStore.name}</h2>
      <ShowList list={list} store={listStore} />
      {auth.currentUser &&
        <>
          {!emailSent && <SendList action={sendEmail} list_id={list?.id} />}
          {!emailSent && emailLoading && <Loader />}
          {emailSent && 'Email sent!'}
          <Button className="w-full btn-link text-sm error mt-5" icon="fas fa-arrow-left" handleOnClick={() => history.push('/dashboard')}> Back to Dashboard</Button>
        </>

      }
    </section>
  )
}
