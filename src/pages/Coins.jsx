import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import CoinInfo from "../components/Banner/CoinInfo";
import LinearProgress from "@mui/material/LinearProgress";
import { SingleCoin } from "../config/api";

const Coins = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();
  const [loading, setLoading] = useState(false);
  console.log(coin);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        <LinearProgress className="bg-white" />
      ) : (
        <div className="flex flex-col gap-4 items-center mt-10">
          <div>
            <div className="flex flex-col items-center max-w-lg">
              <div className="lg:flex items-center gap-4">
                <img src={coin?.image.large} alt={coin?.id} className="w-44" />
                <div>
                  <h1 className="uppercase font-bold text-3xl text-center lg:text-left">
                    {coin?.symbol}
                  </h1>
                  <h1 className="uppercase font-bold text-3xl">{coin?.id}</h1>
                </div>
              </div>
              <p className="max-w-xl text-left p-6 content-center">
                {coin?.description.en.split(". ")[(0, 1)]}.
              </p>
              <div className="">
                <p className="font-bold text-3xl px-4">
                  Rank: {coin?.market_cap_rank}
                </p>
                <p className="font-bold text-3xl px-4">
                  Currency: {symbol}{" "}
                  {coin?.market_data.current_price[currency.toLowerCase()]}
                </p>
                <p className="font-bold text-3xl px-4">
                  Market Cap:{" "}
                  {coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    .slice(0, -6)}
                  M
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <CoinInfo coin={coin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Coins;
