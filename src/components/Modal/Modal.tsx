import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.scss";
import { closeModal } from "../../redux/modalSlice";
import { useLocation } from "react-router-dom";
import { selectIsModal } from "../../redux/modalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type ModalProps = {
  children: React.ReactNode;
  showModal: boolean;
  closeModal: () => void;
};

function Modal(props: ModalProps) {
  const isOpen = useAppSelector(selectIsModal);
  const dispatch = useAppDispatch();
  const close = dispatch(closeModal);

  //  Code for closing the modal in the case user
  // decides to click the book's url
  const url = useLocation();
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current !== true) {
      ref.current = true;
    } else {
      props.closeModal();
    }
  }, [url]);

  if (!props.showModal) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={props.closeModal}>
          &times;
        </span>
        {props.children}
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement
  );
}

export default Modal;
