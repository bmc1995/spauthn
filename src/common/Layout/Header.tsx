import { Box } from "@mui/joy";
import { FC, PropsWithChildren } from "react";

export const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        paddingInline: 0,
        background: theme.palette.background.surface,
        borderBottom: `1px solid ${theme.palette.primary.outlinedBorder}`,
      })}
      component={"header"}
    >
      {children}
    </Box>
  );
};
