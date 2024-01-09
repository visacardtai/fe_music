import React, { useEffect, useState } from "react";
import * as apis from "../../apis";
import { styled } from "@mui/material/styles";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
const ChartFavorite = () => {
  const [chart, setChart] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await apis.getChartFavorite();
      if (response?.status === 200) {
        setChart(response?.data);
      }
    };
    fetchData();
  }, []);

  var data = {
    type: "bar",
    labels: chart?.data?.map((x) => x.title),
    datasets: [
      {
        label: "Số lượt thích",
        data: chart?.data?.map((x) => x.userCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  // const data = {
  //   labels: ["asdd", "44", "44"],
  //   datasets: [
  //     {
  //       label: "369",
  //       data: [1, 2, 5],
  //     },
  //   ],
  // };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };
  //
  return (
    <div>
      <DrawerHeader />
      <div className="w-[100%] h-full flex items-center justify-center">
        <Bar data={data} height={400} options={options} />
      </div>
      <h2 className="text-blue-800 mt-10 text-[20px] flex items-center justify-center">
        Biểu đồ cột thống kê lược thích của bài hát
      </h2>
    </div>
  );
};

export default ChartFavorite;
