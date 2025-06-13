import { Box } from "@mui/joy";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} paddingTop={"2rem"}>
      <LoginForm />
    </Box>
  );
};
