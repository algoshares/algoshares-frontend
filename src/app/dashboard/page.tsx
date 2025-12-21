'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SIPArea from "@/components/dashboard/SIPArea";
import ICOArea from "@/components/dashboard/ICOArea";
import GOSClaim from "@/components/dashboard/GOSClaim";
import TraderCard from "@/components/dashboard/TraderCard";
import { getTraderCardData } from "@/lib/getTraderCardData"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { preseedAbi } from "@/abi/preseedAbi";
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from "wagmi";

const PRESEED_ADDRESS = "0xCb628215df5F2b78cD84CF47cA589C352520f770";

const TRADER_IDS = [1, 2];

interface TraderCardData {
    name: string;
    deposits: number;
    withdrawals: number;
    profit: number;
    dailyGraph: { day: string; balance: number; profitPercent: number }[];
}

export default function DashboardPage() {
    const { address, isConnected } = useAccount();
    const [traders, setTraders] = useState<(TraderCardData & { id: number })[]>([]);

    const { data: allocated } = useReadContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "allocatedOfView",
        args: address ? [address] : undefined,
        query: { enabled: !!address },
    });
    const isPreseeder = typeof allocated === "bigint" && allocated > BigInt(0);

    useEffect(() => {
        async function loadData() {
            try {
                const results = await Promise.all(
                    TRADER_IDS.map(async (id) => {
                        const dataFromApi = await getTraderCardData(id);

                        return {
                            id,
                            name: dataFromApi.name,
                            deposits: dataFromApi.deposits,
                            withdrawals: dataFromApi.withdrawals,
                            profit: dataFromApi.profit,
                            dailyGraph: dataFromApi.dailyGraph.map(d => ({
                                day: d.date,
                                balance: d.balance,
                                profitPercent: d.profitPercent,
                            })),
                        };
                    })
                );

                setTraders(results);
            } catch (err) {
                console.error("Error loading trader data", err);
            }
        }

        loadData();
    }, []);


    return (
        <main className="relative min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-6 py-12 overflow-hidden">
            {/* Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/bg-dashboard.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/70" /> {/* overlay for readability */}
            </motion.div>

            {/* Foreground content */}
            <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold">AlgoShares Dashboard</h1>
                    <ConnectButton />
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* ICO Participation */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="p-6 bg-gray-900/80 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">ICO Participation</h2>
                        <ICOArea />
                    </motion.div>

                    {/* SIP */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1 }}
                        className="p-6 bg-gray-900/80 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">SIP (Strategic Investment Plan)</h2>
                        <p><i>Currently this is dummy data, until the SIP contract is live (refer to Roadmap in the docs)</i></p>
                        <SIPArea />
                    </motion.div>

                    {/* PreSeeder Claim */}
                    {isConnected && isPreseeder && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="p-6 bg-gray-900/80 rounded-2xl shadow-lg"
                        >
                            <h2 className="text-xl font-semibold mb-4">AGS Preseeder Claim</h2>
                            <GOSClaim />
                            {/*<p className="text-gray-300 mb-4">You are eligible to claim your vested AGS tokens.</p>
                            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold hover:scale-105 transition">
                                Claim Tokens
                            </button>*/}
                        </motion.div>
                    )}

                    {/* Trader Accounts */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="p-6 bg-gray-900/80 rounded-2xl shadow-lg col-span-1 md:col-span-2 lg:col-span-3"
                    >
                        <h2 className="text-xl font-semibold mb-6">Trader Accounts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {traders.map((t) => (
                                <TraderCard key={t.id} {...t} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
