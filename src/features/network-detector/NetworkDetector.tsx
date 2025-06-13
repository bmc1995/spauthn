import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { dispatchToast } from "../../common/notifications/utils/dispatchToast";

export const NetworkDetector: FC<PropsWithChildren> = ({ children }) => {
  const prevConnectionStatus = useRef(navigator.onLine);

  useEffect(() => {
    const handleConnectionChange = () => {
      const connected = navigator.onLine;
      if (connected) {
        if (!prevConnectionStatus.current) {
          dispatchToast("Internet Connection Restored.", "success");
        }
      } else {
        dispatchToast("Internet Connection Lost.", "danger");
      }
      prevConnectionStatus.current = connected;
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
    };
  }, []);

  return <>{children}</>;
};
