import { useEffect } from "react";
import { useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const ToastComp = ({ config, message, reset }) => (
  <div
    style={{
      position: "fixed",
      bottom: "10px",
      right: "10px",
      zIndex: 9999,
    }}
  >
    <Toast style={config.style}>
      <ToastHeader>{config.heading}</ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  </div>
);

export function ToastMessage({ eventType, message, reset }) {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setShowToast(false);
      reset()
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  const successStyle = {
    color: "white",
    backgroundColor: "green",
  };

  const errorStyle = {
    color: "white",
    backgroundColor: "red",
  };

  const alertConfig = {
    "1": {
      heading: "Success",
      style: { ...successStyle },
    },
    "0": {
      heading: "Error",
      style: { ...errorStyle },
    },
  };

  const toastConfig = alertConfig[`${eventType}`];
  return (
    showToast && (
      <ToastComp config={toastConfig} message={message} reset={reset}/>
    )
  );
}

export function callToast(toast){
    console.log(toast.enable, toast.message);
    if(!toast.enable){
        console.log('not enabled');
        return;
    }
    // toast.enable = false;
    return <ToastMessage eventType={toast.eventType} message={toast.message}/>
}
