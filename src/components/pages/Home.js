import { useState, useEffect } from "react";
import Signup from "../auth/Signup";
import Modal from "../common/Modal";
import Button from "../common/Button";

export default function Home({ title }) {

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <>
      <h2>Grocery Shopping...Revolutionized!</h2>
      <p>Everyone thinks I'm a nerd, but this app will change your grocery shopping life, lol</p>
      <Button handleOnClick={() => setIsOpen(true)} className="mt-3">Sign In</Button>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <Signup />
        <Button handleOnClick={() => setIsOpen(false)}>Close</Button>
      </Modal>

    </>
  )
}
