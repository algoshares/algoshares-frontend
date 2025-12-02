"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import Link from "next/link"

interface TraderCardProps {
    id: number
    name: string
    deposits: number
    withdrawals: number
    profit: number
    dailyGraph: { day: string; balance: number; profitPercent: number }[]
}

export default function TraderCard({ id, name, deposits, withdrawals, profit, dailyGraph }: TraderCardProps) {
    return (
        <Link href={`/dashboard/trader/${id}`}>
            <Card className="bg-gray-900/80 rounded-2xl shadow-lg p-4">
                <CardContent>
                    <h3 className="text-lg font-bold mb-2 text-gray-300">{name}</h3>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mb-4">
                        <div>
                            <p className="font-semibold text-green-400">${deposits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p>Deposits</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-400">${withdrawals.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p>Withdrawals</p>
                        </div>
                        <div>
                            <p className={`font-semibold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p>Net Profit</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dailyGraph}>
                                {/* X axis with dates */}
                                <XAxis
                                    dataKey="day"
                                    tick={{ fill: 'white', fontSize: 10 }}
                                    interval={(dailyGraph.length <= 4 ? 0 : Math.floor(dailyGraph.length / 4))}
                                    //angle={-90} // rotate labels slightly
                                />

                                {/* Left Y axis for balance */}
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    tick={{ fill: 'white', fontSize:10 }}
                                    width={60}
                                />

                                {/* Right Y axis for profit % */}
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    tick={{ fill: 'white', fontSize: 10 }}
                                    width={60}
                                    domain={['auto', 'auto']}
                                    tickFormatter={(val) => `${val.toFixed(2)}%`}
                                />

                                {/* Tooltip */}
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#111", border: "none" }}
                                    labelStyle={{ color: "white" }}
                                    formatter={(value: number, name: string) => {
                                        if (name === "balance") return [`$${value.toFixed(2)}`, "Balance"];
                                        if (name === "profitPercent") return [`${value.toFixed(2)}%`, "Profit %"];
                                        return [value, name];
                                    }}
                                />

                                {/* Lines */}
                                <Line
                                    type="monotone"
                                    dataKey="balance"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    dot={false}
                                    yAxisId="left"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="profitPercent"
                                    stroke="#eab308"
                                    strokeWidth={2}
                                    dot={false}
                                    yAxisId="right"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
