import { ColorPaletteProp } from "@mui/joy";
import { addToast } from "../../../app/redux/slices/toastSlice";
import { generateUUID } from "../../utils/generateUUID";
import store from "../../../app/redux/store";
import { DisplayDuration } from "./enums";

export const dispatchToast = (msg: string, color: ColorPaletteProp): void => {
  const duration =
    color === "danger" ? DisplayDuration.ALERT : DisplayDuration.NORMAL;
  store.dispatch(
    addToast({
      color,
      msg,
      variant: "outlined",
      id: generateUUID(),
      duration,
    })
  );
};
