import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed"],
    datasets: [
      {
        label: "369",
        data: [6, 3, 9],
        backgroundColor: "brown",
        borderColor: "black",
        pointBorderColor: 'brown',
        borderWidth: 1,
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    plugins: {
      legend: true
    }
  };

  return (
    <Box sx={{marginLeft: '40px'}}>
      <Line
        data={data}
        options={options}
        style={{
          width: 800
        }}
      ></Line>
    </Box>
  );
};

export default LineChart;
