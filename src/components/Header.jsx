import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: '#fff'},
    },
  });
  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState()

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
      <Container className=" max-h-20 p-2">
        <Toolbar className="flex justify-between">
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            className="text-slate-200 cursor-pointer">
            Crypto App
          </Typography>
          <FormControl>
            <InputLabel id="demo-simple-select-label" >Age</InputLabel>
            <Select
              className="min-w-24 max-h-14 mr-2 "
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              >
              <MenuItem value={'INR'}>INR</MenuItem>
              <MenuItem value={'USD'}>USD</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};

export default Header;
