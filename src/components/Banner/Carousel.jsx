import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { green, red } from "@mui/material/colors";

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const [trending, setTrensing] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchApi = async () => {
    const response = await axios.get(TrendingCoins(currency));
    setTrensing(response.data);
  };

  useEffect(() => {
    fetchApi();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h > 0;
    return (
      <Link to={`/coins/${coin.id}`} className="flex flex-col text-center">
        <img
          className="h-20 object-contain"
          src={coin?.image}
          alt={coin.name}
        />
        <span className="uppercase pt-2">
          {coin?.symbol}
          &nbsp; &nbsp;
          <span className={`${profit ? "text-green-300" : "text-red-400"}`}>
            {profit ? (
              <TrendingUpIcon sx={{ color: green["A400"] }} />
            ) : (
              <TrendingDownIcon sx={{ color: red["A200"] }} />
            )}{" "}
            {coin?.price_change_percentage_24h?.toFixed(2).replace(/-/g, "") +
              "%"}
          </span>
        </span>
        <span className="font-bold text-xl">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    200: {
      items: 2,
    },
    600: {
      items: 4,
      itemsFit: "contain",
    },
  };
  return (
    <div>
      <AliceCarousel
        paddingLeft={50}
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}></AliceCarousel>
    </div>
  );
};

export default Carousel;
