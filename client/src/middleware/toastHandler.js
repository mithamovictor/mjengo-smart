import { toast } from 'react-toastify';

const TOAST_THEME = 'dark';

/**
 * This is a function to show toasts based on the need. The toast
 * types include info, success, warning and error. It uses
 * react-toastify module for the toasts.
 * @see https://fkhadra.github.io/react-toastify/introduction
 * @param type the toast type
 * @param message the message output in the toast
 * @returns toast
 */
export const ToastRunner = (type, message) => {
  switch(type) {
    case 'info':
      return toast.info(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: TOAST_THEME
      });
    case 'success':
      return toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: TOAST_THEME
      });
    case 'error':
      return toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: TOAST_THEME
      });
    case 'warning':
      return toast.warning(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: TOAST_THEME
      });
    default:
      return;
  }
}
