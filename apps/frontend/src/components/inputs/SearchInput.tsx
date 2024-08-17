import { Search } from "@mui/icons-material";
import { Input, InputAdornment, InputProps } from "@mui/material";

interface Props extends InputProps {
  label?: string;
}

export function SearchInput(props: Props) {
  return (
    <Input
      sx={{ width: "100%" }}
      placeholder={props.label ? props.label : ""}
      endAdornment={
        <InputAdornment position="end">
          <Search />
        </InputAdornment>
      }
      {...props}
    />
  );
}
