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
    data: { day: string; balance: number; equity: number }[]
}

export default function TraderCard({ id, name, deposits, withdrawals, profit, data }: TraderCardProps) {
    return (
        <Link href={`/dashboard/trader/${id}`}>
            <Card className="bg-gray-900/80 rounded-2xl shadow-lg p-4">
                <CardContent>
                    <h3 className="text-lg font-bold mb-2 text-gray-300">{name}</h3>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-300 mb-4">
                        <div>
                            <p className="font-semibold text-green-400">${deposits.toLocaleString()}</p>
                            <p>Deposits</p>
                        </div>
                        <div>
                            <p className="font-semibold text-red-400">${withdrawals.toLocaleString()}</p>
                            <p>Withdrawals</p>
                        </div>
                        <div>
                            <p className={`font-semibold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                ${profit.toLocaleString()}
                            </p>
                            <p>Net Profit</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="day" hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#111", border: "none" }}
                                    labelStyle={{ color: "white" }}
                                />
                                <Line type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="equity" stroke="#eab308" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
