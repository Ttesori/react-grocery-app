import { useState } from "react";
import Signup from "../auth/Signup";
import Modal from "../common/Modal";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <h2>Grocery Shopping...Revolutionized!</h2>
      <p>Everyone thinks I'm a nerd, but this app will change your grocery shopping life, lol</p>
      <button onClick={() => setIsOpen(true)}>Sign In</button>
      <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
        <Signup />
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>

    </>
  )
}
