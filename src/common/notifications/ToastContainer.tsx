import { Stack } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Toast } from "./Toast";

export const ToastContainer = () => {
  const { toastQueue } = useSelector((state: RootState) => state.toast);

  return (
    <Stack
      position={"fixed"}
      width={"250px"}
      zIndex={10}
      bottom={25}
      left={25}
      display={toastQueue.length ? "flex" : "none"}
    >
      {toastQueue.map((toast) => (
        <Toast key={toast.id} toastProps={toast} />
      ))}
    </Stack>
  );
};
