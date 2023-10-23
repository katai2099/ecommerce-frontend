import { Box, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getSaleAnalytic } from "../../controllers/order";
import { days, months } from "../../model/constant";
import {
  IMonthlySaleData,
  ISaleAnalytic,
  IWeeklySaleData,
  SaleAnalytic,
} from "../../model/order";
import Title from "./Title";

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

function generateLast7DaysData(weeklySaleData: IWeeklySaleData[]) {
  return weeklySaleData.map((data) =>
    createData(days[data.dayOfWeek - 1], data.totalSales)
  );
}

function generateLast12monthsdata(monthlySaleData: IMonthlySaleData[]) {
  let currentYear = 0;
  let newYear = false;
  return monthlySaleData.map((data) => {
    if (currentYear !== data.year) {
      currentYear = data.year;
      newYear = true;
    } else {
      newYear = false;
    }
    return createData(
      `${months[data.month - 1]} ${newYear ? data.year : ""}`,
      data.totalSales
    );
  });
}

const options = ["7 days", "12 months"];

export const SaleAnalyticComp = () => {
  const [saleAnalytic, setSaleAnalytic] = useState<ISaleAnalytic>(
    new SaleAnalytic()
  );
  const theme = useTheme();
  const [mode, setMode] = useState<number>(0);
  const last7daysData = generateLast7DaysData(saleAnalytic.weeklySaleData);
  const last12monthsData = generateLast12monthsdata(
    saleAnalytic.monthlySaleData
  );
  console.log(last12monthsData);

  useEffect(() => {
    getSaleAnalytic()
      .then((res) => setSaleAnalytic(res))
      .catch((err) => {});
  }, []);

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title>Last {options[mode]}</Title>
        <Select
          value={mode}
          onChange={(event) => {
            setMode(Number(event.target.value));
          }}
        >
          {options.map((value, idx) => (
            <MenuItem key={idx} value={idx}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <ResponsiveContainer minHeight={300}>
        <LineChart
          data={mode === 0 ? last7daysData : last12monthsData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
