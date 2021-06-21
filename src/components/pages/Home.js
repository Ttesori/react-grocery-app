import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Signup from "../auth/Signup";
export default function Home() {
  const history = useHistory();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        history.push('/');
      } else {
        history.push('/stores')
      }
    });
  }, [history])
  return (
    <>
      <h2>Grocery Shopping...Revolutionized!</h2>
      <p>Everyone thinks I'm a nerd, but this app will change your grocery shopping life, lol</p>
      <Signup />
    </>
  )
}
