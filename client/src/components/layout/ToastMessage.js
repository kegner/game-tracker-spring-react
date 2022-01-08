import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Toast } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import { hideToast } from '../../actions/toastActions';

const ToastMessage = (props) => {

  const { id, isError, message } = props.toast;

  const toastEl = useRef();
  const bsToast = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    bsToast.current = new Toast(toastEl.current);
    const currentToastEl = toastEl.current;

    bsToast.current.show();

    const hideHandler = () => {
      dispatch(hideToast(id));
    }

    currentToastEl.addEventListener('hidden.bs.toast', hideHandler);

    return () => {
      dispatch(hideToast(id));
      currentToastEl.removeEventListener('hidden.bs.toast', hideHandler);
    };
  }, [dispatch, id]);

  const bgClass = isError ? "bg-danger" : "bg-success";

  return (
    <div ref={toastEl} className={`toast text-white ${bgClass}`} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default ToastMessage
