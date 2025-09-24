import { toast, Bounce, type ToastPosition, type ToastOptions } from "react-toastify";

export const showToast = ( message: string = "", messageType: "success" | "error" | "info" | "warn" = "success") => {
  const toastProperty: ToastOptions = {
    position: "bottom-center" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  };

  switch (messageType) {
    case "success":
      return toast.success(message, toastProperty);

    case "error":
      return toast.error(message, toastProperty);

    case "info":
      return toast.info(message, toastProperty);

    case "warn":
      return toast.warn(message, toastProperty);

    default:
      return toast(message, toastProperty); // fallback: plain toast
  }
};
