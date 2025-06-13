import { Box } from "@mui/joy";
import { FC, PropsWithChildren } from "react";

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        height: "inherit",
        minHeight: "100vh",
        zIndex: 1,
        background: theme.palette.background.backdrop,
      })}
      component={"main"}
    >
      {children}
    </Box>
  );
};
