import './css/Home.css';
import { useEffect } from "react";
import ResetPassword from '../auth/ResetPassword';

export default function Reset({ title }) {

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-home';
  }, [title])

  return (
    <>
      <ResetPassword />
    </>
  )
}
