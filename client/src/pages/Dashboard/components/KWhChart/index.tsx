"use client";

import React from "react";
import ReactEcharts from "echarts-for-react";
import { Plus_Jakarta_Sans as PlusJakartaSans } from "next/font/google";

import { numberWithDots } from "@/utils/numberWithDots";

const plusJakartaSans = PlusJakartaSans({
  weight: ["500"],
  preload: true,
  subsets: ["latin"],
});

interface KWhChartProps {
  data: [string, number, number][];
}

export const KWhChart: React.FC<KWhChartProps> = ({ data }) => {
  return (
    <div className="h-full">
      <ReactEcharts
        className="!h-full"
        option={{
          color: ["#166534", "#22c55e"],
          responsive: true,
          maintainAspectRatio: false,
          grid: {
            top: 96,
            bottom: 32,
            left: 72,
            right: 16,
          },
          legend: {
            type: "scroll",
            orient: "horizontal",
            right: 16,
            top: 22,
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
            trigger: "axis",
            axisPointer: { type: "shadow", shadowStyle: {} },
            valueFormatter: (value: number) => `${numberWithDots(value)} kWh`,
          },
          dataset: {
            dimensions: ["month", "Consumo de energia", "Energia compensada"],
            source: data,
          },
          xAxis: {
            type: "category",
          },
          yAxis: {},
          textStyle: {
            ...plusJakartaSans.style,
            fontWeight: "500",
          },
          series: [
            {
              type: "bar",
            },
            {
              type: "bar",
            },
          ],
        }}
      />
    </div>
  );
};
