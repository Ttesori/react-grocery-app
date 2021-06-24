import './css/Home.css';
import { useEffect } from "react";
import Signup from "../auth/Signup";

export default function Home({ title }) {

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-home';
  }, [title])

  return (
    <>
      <Signup />
    </>
  )
}
