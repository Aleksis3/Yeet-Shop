import React from "react";
interface ILogIn {
  handleClose: () => void;
}
function LogIn(props: ILogIn) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.handleClose()}>
          &times;
        </span>
        <p style={{ color: "black" }}>Some text in the Modal..</p>
      </div>
    </div>
  );
}

export default LogIn;
