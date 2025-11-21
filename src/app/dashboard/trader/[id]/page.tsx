"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { use } from 'react';

export default function TraderDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    const traderId = id;

    const name = "Trader " + traderId;

    const closed_actions = [
        { id: 3, date: "2025-11-02 13:12:09", action: "Withdrawal", pair: "", size: "", entry: 0, exit: 0, profit: 0, commission: 0, swap: 0, netting: -5066.26 },
        { id: 2, date: "2025-11-02 12:33:41", action: "Sell", pair: "EURUSD", size: "0.05", entry: 1.15444, exit: 1.14598, profit: 66.50, commission: -0.18, swap: -0.06, netting: 66.26 },
        { id: 1, date: "2025-11-01 08:17:55", action: "Deposit", pair: "", size: "", entry: 0, exit: 0, profit: 0, commission: 0, swap: 0, netting: 5000 }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-10 text-gray-200">

            {/* Back button */}
            <Link
                href="/dashboard"
                className="inline-block mb-8 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold rounded-xl shadow hover:scale-105 transition"
            >
                Back to Dashboard
            </Link>

            {/* Header */}
            <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
                {name}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">

                <Card className="bg-gray-900/50 rounded-2xl backdrop-blur shadow-lg border border-gray-800">
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Trades</h2>

                        <table className="w-full text-sm text-gray-300 border-collapse table-fixed">

                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="py-2" style={{ textAlign: "left" }}>Datetime</th>
                                    <th className="py-2" style={{ textAlign:"left" }}>Action</th>
                                    <th className="py-2" style={{ textAlign:"left" }}>Pair</th>

                                    <th className="py-2"><div style={{ textAlign:"right" }}>Size</div></th>
                                    <th className="py-2"><div style={{ textAlign: "right" }}>Entry</div></th>
                                    <th className="py-2"><div style={{ textAlign: "right" }}>Exit</div></th>

                                    <th className="py-2"><div style={{ textAlign: "right" }}>Profit</div></th>
                                    <th className="py-2"><div style={{ textAlign: "right" }}>Commission</div></th>
                                    <th className="py-2"><div style={{ textAlign: "right" }}>Swap</div></th>
                                    <th className="py-2"><div style={{ textAlign: "right" }}>Netting</div></th>
                                </tr>
                            </thead>

                            <tbody>
                                {closed_actions.map(t => (
                                    <tr key={t.id} className="border-b border-gray-800">
                                        <td className="py-2" style={{ textAlign: "left" }}>{t.date}</td>
                                        <td className="py-2" style={{ textAlign: "left" }}>{t.action}</td>
                                        <td className="py-2" style={{ textAlign: "left" }}>{t.pair || "-"}</td>

                                        <td className="py-2"><div style={{ textAlign: "right" }}>{t.size ?? "-"}</div></td>
                                        <td className="py-2"><div style={{ textAlign: "right" }}>{t.entry}</div></td>
                                        <td className="py-2"><div style={{ textAlign: "right" }}>{t.exit}</div></td>

                                        <td className="py-2">
                                            <div className={` ${t.profit >= 0 ? "text-green-400" : "text-red-400"} `} style={{ textAlign: "right" }}>
                                                {t.profit}
                                            </div>
                                        </td>

                                        <td className="py-2">
                                            <div className={`${t.commission >= 0 ? "text-green-400" : "text-red-400"}`} style={{ textAlign: "right" }}>
                                                {t.commission}
                                            </div>
                                        </td>

                                        <td className="py-2">
                                            <div className={` ${t.swap >= 0 ? "text-green-400" : "text-red-400"} `} style={{ textAlign: "right" }}>
                                                {t.swap}
                                            </div>
                                        </td>

                                        <td className="py-2">
                                            <div className={`${t.netting >= 0 ? "text-green-400" : "text-red-400"}`} style={{ textAlign: "right" }}>
                                                {t.netting}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
