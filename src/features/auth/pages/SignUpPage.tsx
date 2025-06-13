import { Box } from "@mui/joy";
import { SignUpForm } from "../components/SignUpForm";

export const SignUpPage = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} paddingTop={"2rem"}>
      <SignUpForm />
    </Box>
  );
};
