import toast from 'react-hot-toast';

type ToastNotificationProps = {
  message: string;
  type: "success" | "error" | "warning"
};

export const ToastNotification = ({
  message,
  type,
}: ToastNotificationProps) => {
  switch (type) {
    case "success":
      return toast.success(message, {
        style: {
          border: '1px solid #62D346',
        },
      });
    case "error":
      return toast.error(message, {
        style: {
          border: '1px solid #FF4C4C',
        },
      });
    default:
      return toast(message, {
        style: {
          border: '1px solid #FFB020',
        }
      })
  };
};
