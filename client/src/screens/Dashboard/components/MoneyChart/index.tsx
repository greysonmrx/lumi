"use client";

import React from "react";
import ReactEcharts from "echarts-for-react";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";

import { formatMoney } from "@/utils/formatMoney";

const plusJakartaSans = PlusJakartaSans({
  weight: ["500"],
  preload: true,
  subsets: ["latin"],
});

interface MoneyChartProps {
  data: number[];
}

export const MoneyChart: React.FC<MoneyChartProps> = ({ data }) => {
  return (
    <div className="h-full">
      <ReactEcharts
        className="!h-full"
        option={{
          responsive: true,
          maintainAspectRatio: false,
          color: ["#22c55e", "#166534"],
          grid: {},
          legend: {
            bottom: "5%",
            left: "center",
            type: "scroll",
            orient: "horizontal",
            icon: "circle",
            itemGap: 20,
            itemWidth: 20,
            pageButtonItemGap: 2,
            textStyle: {
              ...plusJakartaSans.style,
              fontWeight: "500",
            },
          },
          tooltip: {
            show: true,
            trigger: "item",
            axisPointer: { type: "shadow", shadowStyle: {} },
            valueFormatter: (value: number) => formatMoney(value),
          },
          textStyle: {
            ...plusJakartaSans.style,
            fontWeight: "500",
          },
          series: [
            {
              type: "pie",
              radius: ["35%", "65%"],
              avoidLabelOverlap: false,
              padAngle: 5,
              itemStyle: {
                borderRadius: 5,
              },
              label: {
                show: false,
                opacity: 0,
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: data[0], name: "Valor sem GD" },
                { value: data[1], name: "Economia GD" },
              ],
            },
          ],
        }}
      />
    </div>
  );
};
