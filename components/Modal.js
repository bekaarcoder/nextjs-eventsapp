import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => setIsBrowser(true));

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = show ? (
        <>
            <div className="modal modal-show">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else {
        return null;
    }
}
