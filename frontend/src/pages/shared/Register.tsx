import SignInCard from "../../components/shared/login/SignInCard";
import { Box } from "@mui/material";

const Register = () => {
  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        p={2}
      >
        <SignInCard register />
      </Box>
    </div>
  );
};

export default Register;
