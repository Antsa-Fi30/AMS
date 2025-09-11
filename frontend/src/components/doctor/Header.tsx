import { Box, Button } from "@mui/material";
import { logout } from "../../services/AuthServices";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (localStorage.getItem("refresh")) {
  //       navigate("/");
  //     }
  //   }, []);

  const handleLogOut = async () => {
    const refresh = localStorage.getItem("refresh");
    try {
      if (refresh) await logout(refresh);
    } catch (err) {
      console.error("logout failed", err);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/");
    }
  };

  return (
    <div>
      <Box className="shadow-2xl bg-red-300">
        <Button onClick={handleLogOut} variant="contained" color="error">
          Log out
        </Button>
      </Box>
    </div>
  );
};

export default Header;
