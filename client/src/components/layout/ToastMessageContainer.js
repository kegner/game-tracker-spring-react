import React from 'react'
import { useSelector } from 'react-redux';
import ToastMessage from './ToastMessage'

const ToastMessageContainer = () => {

  const { toasts } = useSelector(state => state.toastReducer);

  return (
    <div className="toast-container position-fixed p-3 border-0 bottom-0 end-0">
      {toasts.map(toast => (
        <ToastMessage key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastMessageContainer
