import { Search } from "@mui/icons-material";
import { Input, InputAdornment, InputProps } from "@mui/material";

export function SearchInput(props: InputProps) {
  return (
    <Input
      sx={{ width: "100%" }}
      placeholder="Client name..."
      endAdornment={
        <InputAdornment position="end">
          <Search />
        </InputAdornment>
      }
    />
  );
}
