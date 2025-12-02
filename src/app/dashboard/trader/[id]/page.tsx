"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { use, useEffect, useState } from "react";

interface TradeRow {
    datetime: number; // unix seconds
    action: string;
    pair: string;
    lots: number;
    entry: number;
    exit: number;
    profit: number;
    commission: number;
    swap: number;
    netting: number;
}

export default function TraderDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); 
    const traderId = id;

    const [trades, setTrades] = useState<TradeRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                // Fetch from internal Next.js API route
                const res = await fetch(`/api/traderDetailedList?trader_id=${traderId}`);
                const json = await res.json();
                setTrades(json.trades);
            } catch (err) {
                console.error("Failed loading trades:", err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [traderId]);

    if (loading) {
        return <div className="text-gray-300 p-10">Loading trades...</div>;
    }
    function formatDate(unix: number) {
        return new Date(unix * 1000).toLocaleString();
    }

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
                Trader details
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
                                {trades.map((t, index) => (
                                    <tr key={index} className="border-b border-gray-800">
                                        <td className="py-2 text-left">{formatDate(t.datetime)}</td>
                                        <td className="py-2 text-left">{t.action}</td>
                                        <td className="py-2 text-left">{t.pair || "-"}</td>

                                        <td className="py-2 text-right">{t.lots.toFixed(4)}</td>
                                        <td className="py-2 text-right">{t.entry.toFixed(5)}</td>
                                        <td className="py-2 text-right">{t.exit.toFixed(5)}</td>

                                        <td className={`py-2 text-right ${t.profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {t.profit.toFixed(2)}
                                        </td>

                                        <td className={`py-2 text-right ${t.commission >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {t.commission.toFixed(2)}
                                        </td>

                                        <td className={`py-2 text-right ${t.swap >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {t.swap.toFixed(2)}
                                        </td>

                                        <td className={`py-2 text-right ${t.netting >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {t.netting.toFixed(2)}
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
