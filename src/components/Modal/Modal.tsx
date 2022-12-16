import React from "react";
import "./Modal.scss";
import { closeModal } from "../../redux/modalSlice";
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

  if (!props.showModal) {
    return null;
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.closeModal}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
