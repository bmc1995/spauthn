import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ToastAlert, removeToast } from "../../app/redux/slices/toastSlice";
import { Alert } from "@mui/joy";
import { Close } from "@mui/icons-material";

export const Toast = ({ toastProps }: { toastProps: ToastAlert }) => {
  const { msg, color, variant, id, duration = 0 } = toastProps;

  const [opacity, setOpacity] = useState(0);
  const dispatch = useDispatch();

  const hideTimerIdRef = useRef<number | NodeJS.Timeout | null>(null);
  const removeTimerIdRef = useRef<number | NodeJS.Timeout | null>(null);

  const handleClickRemove = useCallback(() => {
    if (hideTimerIdRef.current) clearTimeout(hideTimerIdRef.current);
    setOpacity(0);
    hideTimerIdRef.current = setTimeout(() => {
      removeTimerIdRef.current = setTimeout(() => {
        dispatch(removeToast(id));
      }, 50);
    }, 200);
  }, [dispatch, id]);

  useEffect(() => {
    setOpacity(1);
    if (duration > 0) {
      hideTimerIdRef.current = setTimeout(() => {
        handleClickRemove();
      }, duration);
    }

    return () => {
      if (hideTimerIdRef.current) clearTimeout(hideTimerIdRef.current);
      if (removeTimerIdRef.current) clearTimeout(removeTimerIdRef.current);
    };
  }, [dispatch, duration, handleClickRemove, id]);

  return (
    <Alert
      endDecorator={
        <Close
          onClick={handleClickRemove}
          cursor={"pointer"}
          accentHeight={"240px"}
          tabIndex={0}
          role="button"
          aria-description="Close Alert"
          sx={{
            border: "1px solid gray",
            borderRadius: "2px",
            ":hover": { color: "ButtonText" },
            ":active": { borderColor: "ButtonFace" },
          }}
        />
      }
      style={{
        opacity,
        transitionProperty: "opacity",
        transitionDuration: "0.3s",
        transitionTimingFunction: "ease-in-out",
      }}
      color={color}
      variant={variant}
      role={color === "danger" ? "alert" : "status"}
      aria-live={color === "danger" ? "assertive" : "polite"}
    >
      {msg}
    </Alert>
  );
};
