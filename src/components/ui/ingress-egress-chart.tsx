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
  ChartTooltipContent,
} from "@/components/ui/area-charts-2"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", ingress: 300, egress: 200 },
  { date: "2024-04-02", ingress: 280, egress: 220 },
  { date: "2024-04-03", ingress: 350, egress: 180 },
  { date: "2024-04-04", ingress: 400, egress: 250 },
  { date: "2024-04-05", ingress: 380, egress: 300 },
  { date: "2024-04-06", ingress: 450, egress: 280 },
  { date: "2024-04-07", ingress: 420, egress: 320 },
  { date: "2024-04-08", ingress: 500, egress: 350 },
  { date: "2024-04-09", ingress: 480, egress: 380 },
  { date: "2024-04-10", ingress: 520, egress: 400 },
  { date: "2024-04-11", ingress: 490, egress: 420 },
  { date: "2024-04-12", ingress: 550, egress: 450 },
  { date: "2024-04-13", ingress: 530, egress: 470 },
  { date: "2024-04-14", ingress: 580, egress: 500 },
  { date: "2024-04-15", ingress: 560, egress: 520 },
  { date: "2024-04-16", ingress: 600, egress: 540 },
  { date: "2024-04-17", ingress: 590, egress: 560 },
  { date: "2024-04-18", ingress: 620, egress: 580 },
  { date: "2024-04-19", ingress: 610, egress: 600 },
  { date: "2024-04-20", ingress: 650, egress: 620 },
  { date: "2024-04-21", ingress: 640, egress: 640 },
  { date: "2024-04-22", ingress: 680, egress: 660 },
  { date: "2024-04-23", ingress: 670, egress: 680 },
  { date: "2024-04-24", ingress: 700, egress: 700 },
  { date: "2024-04-25", ingress: 690, egress: 720 },
  { date: "2024-04-26", ingress: 720, egress: 740 },
  { date: "2024-04-27", ingress: 710, egress: 760 },
  { date: "2024-04-28", ingress: 740, egress: 780 },
  { date: "2024-04-29", ingress: 730, egress: 800 },
  { date: "2024-04-30", ingress: 750, egress: 820 },
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
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Network Traffic</CardTitle>
          <CardDescription>
            Showing ingress and egress traffic for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
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
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
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