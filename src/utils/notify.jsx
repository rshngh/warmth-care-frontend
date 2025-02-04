import { toast } from "react-toastify";

export const notifyDefault = (message) => toast(message);

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-center",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-center",
  });
};

export const notifyWarn = (message) => {
  toast.warn(message, {
    position: "top-center",
  });
};

export const notifyInfo = (message) => {
  toast.info(message, {
    position: "bottom-center",
  });
};

//   toast("Custom Style Notification with css class!", {
//     position: "bottom-right",
//     className: "foo-bar",
//   });

// export const clearWaitingQueue = () => {
//   // Easy, right 😎
//   toast.clearWaitingQueue();
// };
