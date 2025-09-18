import { OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = () => {
  return (
    <div>
      <OutlinedInput
        placeholder="Rechercher..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        }
        sx={{
          width: 300,
          borderRadius: 3,
          backgroundColor: "background.default",
        }}
      />
    </div>
  );
};

export default Searchbar;
