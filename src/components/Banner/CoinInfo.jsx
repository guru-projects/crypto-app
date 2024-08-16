import React, { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import { HistoricalChart } from "../../config/api";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { chartDays } from "../../config/data";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
} from "chart.js";
import SelectButton from "./SelectButton";

// Register components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Title,
  CategoryScale
);

const CoinInfo = (coin) => {
  const [history, setHistory] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);
  const id = coin.id;
  console.log(id);

  const { currency } = CryptoState();
  const fetchHistory = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`
    );
    setflag(true);
    setHistory(data.prices);
  };
  console.log("data", history);

  useEffect(() => {
    fetchHistory();
  }, [days, currency, coin]);

  return (
    <div>
      <div className="w-auto p-2">
        {!history ? (
          <CircularProgress
            thickness={1}
            size={250}
            className="text-blue-500"
          />
        ) : (
          <>
            <Line
              data={{
                labels: history.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: history.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoinInfo;
