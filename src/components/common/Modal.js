import { useEffect, useRef } from 'react';
import './css/Modal.css';

export default function Modal({ handleClose, isOpen, children }) {
  const modalEl = useRef();
  useEffect(() => {
    if (isOpen) {
      modalEl.current.style.display = 'block';
    } else {
      modalEl.current.style.display = 'none';
    }
  }, [isOpen])
  return (
    <div className="modal-background" ref={modalEl}>
      <div className="modal" onClick={() => { }} aria-modal="true">
        <span id="close-btn" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
  )
}
