import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Chast1() {
    const [chartData, setChartData] = useState( [
  {
    name: 'Jan',
    TotalUser: 4000,
    TotalSale: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    TotalUser: 3000,
    TotalSale: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    TotalUser: 2000,
    TotalSale: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    TotalUser: 2780,
    TotalSale: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    TotalUser: 1890,
    TotalSale: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    TotalUser: 2390,
    TotalSale: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    TotalUser: 3490,
    TotalSale: 4300,
    amt: 2100,
  },
   {
    name: 'Aug',
    TotalUser: 3090,
    TotalSale: 5000,
    amt: 2100,
  },
   {
    name: 'Sep',
    TotalUser: 6090,
    TotalSale: 8000,
    amt: 2100,
  },
   {
    name: 'Oct',
    TotalUser: 9090,
    TotalSale: 6000,
    amt: 2100,
  },
   {
    name: 'Nov',
    TotalUser: 6090,
    TotalSale: 5000,
    amt: 2100,
  },
   {
    name: 'Dec',
    TotalUser: 3490,
    TotalSale: 7300,
    amt: 2100,
  },
]);
  return (
     <LineChart
      style={{ width: '100%', maxWidth: '90%', height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid stroke='none' />
      <XAxis dataKey="name" tick={{fontSize:12}} />
      <YAxis width="auto" tick={{fontSize:12}} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="TotalSale" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="TotalUser" stroke="#82ca9d" strokeWidth={3}  />
    </LineChart>
  )
}

export default Chast1