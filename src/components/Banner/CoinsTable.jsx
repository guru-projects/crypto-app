import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { green, red } from "@mui/material/colors";
import {
  Container,
  createTheme,
  LinearProgress,
  responsiveFontSizes,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  ThemeProvider,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const response = await axios.get(CoinList(currency));
    setCoins(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  let theme = createTheme({
    typography: {
      h4: {
        fontWeight: 200,
        marginBottom: 20,
      },
    },
    tableHead: {
      backgroundColor: "#f0f0f0",
    },
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Container className="text-center mt-10 min-w-screen">
        <Typography variant="h4">
          Crypto Currency Prices By Market cap
        </Typography>
        <TextField
          className="w-full"
          label="Search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress className="bg-white" />
          ) : (
            <Table className="mt-6">
              <TableHead className="bg-slate-800 h-20 uppercase">
                <TableRow>
                  <TableCell align="left">Coin</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">24H Change</TableCell>
                  <TableCell align="center">Market Cap</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                        className="hover:bg-slate-700 cursor-pointer">
                        <TableCell component="th" scope="row">
                          <div className="flex gap-4 items-center">
                            <img
                              src={row?.image}
                              alt={row.name}
                              className=" w-14"
                            />
                            <div>
                              <span className="uppercase pt-2 text-left">
                                {row?.symbol}
                                &nbsp; &nbsp;
                                <br />
                                <span className="opacity-60">{row?.name}</span>
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="ml-10 whitespace-nowrap">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.current_price.toFixed(2).slice(0, 6)
                            )}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}>
                          {profit ? (
                            <TrendingUpIcon sx={{ color: green["A400"] }} />
                          ) : (
                            <TrendingDownIcon sx={{ color: red["A200"] }} />
                          )}
                          {row.price_change_percentage_24h
                            .toFixed(2)
                            .replace(/-/g, "")}
                          %
                        </TableCell>
                        <TableCell align="center">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          className="flex justify-center p-10"
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}></Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
