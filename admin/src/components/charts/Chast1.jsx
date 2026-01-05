import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { fetchData } from "../../utils/api";
import { API_PATH } from "../../utils/apiPath";

function Chast1() {
  const [chartData, setChartData] = useState([]);

  const getChartData = async () => {
    try {
      const [userRes, saleRes] = await Promise.all([
        fetchData(API_PATH.ORDER.GET_TOTAL_UDSERS),
        fetchData(API_PATH.ORDER.GET_TOTAL_SALES),
      ]);

      const users = userRes?.totalUser || [];
      const sales = saleRes?.monthlySales || [];
      console.log(sales)
      console.log(users)

      const mergedData = users.map((u) => {
        const saleMatch = sales.find((s) => s.name === u.name);

        return {
          name: u.name,
          totalUser: Number(u.totalUser) || 0,
          totalSale: Number(saleMatch?.totalSale) || 0,
        };
      });

      setChartData(mergedData);
    } catch (error) {
      console.error("Chart API Error", error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div>
      {chartData.length > 0 && (
        <BarChart
          width={1000}
          height={500}
          data={chartData}
          margin={{ top: 5, left: 20, right: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />

          <Bar dataKey="totalSale" fill="#16a34a" name="Total Sales" />
          <Bar dataKey="totalUser" fill="#0858F7" name="Total Users" />
        </BarChart>
      )}
    </div>
  );
}


export default Chast1;
