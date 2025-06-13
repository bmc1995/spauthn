import { Box } from "@mui/joy";
import { FC, PropsWithChildren } from "react";

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        zIndex: -1,
        height: "5rem",
        background: theme.palette.background.surface,
        borderTop: `1px solid ${theme.palette.primary.outlinedBorder}`,
      })}
      component={"footer"}
    >
      {children}
    </Box>
  );
};
