"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/area-charts-2"

const chartData = [
  { date: "2024-04-01", ingress: 1200, egress: 728 },
  { date: "2024-04-02", ingress: 1150, egress: 697 },
  { date: "2024-04-03", ingress: 1320, egress: 800 },
  { date: "2024-04-04", ingress: 1450, egress: 879 },
  { date: "2024-04-05", ingress: 1380, egress: 836 },
  { date: "2024-04-06", ingress: 1580, egress: 958 }, // Weekend spike
  { date: "2024-04-07", ingress: 1520, egress: 921 }, // Weekend spike
  { date: "2024-04-08", ingress: 1280, egress: 776 },
  { date: "2024-04-09", ingress: 1340, egress: 812 },
  { date: "2024-04-10", ingress: 1420, egress: 861 },
  { date: "2024-04-11", ingress: 1380, egress: 836 },
  { date: "2024-04-12", ingress: 1460, egress: 885 },
  { date: "2024-04-13", ingress: 1650, egress: 1000 }, // Weekend spike
  { date: "2024-04-14", ingress: 1720, egress: 1043 }, // Weekend spike
  { date: "2024-04-15", ingress: 1390, egress: 842 },
  { date: "2024-04-16", ingress: 1430, egress: 867 },
  { date: "2024-04-17", ingress: 1520, egress: 921 },
  { date: "2024-04-18", ingress: 1480, egress: 897 },
  { date: "2024-04-19", ingress: 1560, egress: 946 },
  { date: "2024-04-20", ingress: 1820, egress: 1103 }, // Weekend spike
  { date: "2024-04-21", ingress: 1890, egress: 1146 }, // Weekend spike
  { date: "2024-04-22", ingress: 1450, egress: 879 },
  { date: "2024-04-23", ingress: 1500, egress: 909 },
  { date: "2024-04-24", ingress: 1380, egress: 836 },
  { date: "2024-04-25", ingress: 1420, egress: 861 },
  { date: "2024-04-26", ingress: 1480, egress: 897 },
  { date: "2024-04-27", ingress: 1750, egress: 1061 }, // Weekend spike
  { date: "2024-04-28", ingress: 1680, egress: 1018 }, // Weekend spike
  { date: "2024-04-29", ingress: 1320, egress: 800 },
  { date: "2024-04-30", ingress: 1400, egress: 848 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  ingress: {
    label: "Ingress",
    color: "hsl(0, 70%, 75%)", // Soft red
  },
  egress: {
    label: "Egress", 
    color: "hsl(120, 60%, 70%)", // Soft green
  },
} satisfies ChartConfig

export function IngressEgressChart() {
  // Show all data since we removed the filter
  const filteredData = chartData

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Log volumes</CardTitle>
          <CardDescription>
            Showing ingress and egress traffic for the last 30 days
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIngress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ingress)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ingress)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillEgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-egress)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-egress)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}MB`}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-3 py-2 shadow-lg">
                      <div className="text-xs text-slate-500 mb-1">
                        {new Date(label).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs text-slate-600">{entry.name}:</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-900">
                            {entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              dataKey="egress"
              type="natural"
              fill="url(#fillEgress)"
              stroke="var(--color-egress)"
              stackId="a"
            />
            <Area
              dataKey="ingress"
              type="natural"
              fill="url(#fillIngress)"
              stroke="var(--color-ingress)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}