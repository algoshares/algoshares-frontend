'use client'

import { motion } from "framer-motion"
import { WalletConnect } from "@/components/wallet-connect"
import SIPArea from "@/components/dashboard/SIPArea"
import ICOArea from "@/components/dashboard/ICOArea"
import TraderCard from "@/components/dashboard/TraderCard"
import ChainTest from "@/components/dashboard/ChainTest"

const traderData = [
    {
        id: 1,
        name: "Trader #1",
        deposits: 12000,
        withdrawals: 1750,
        profit: 2500,
        data: Array.from({ length: 30 }, (_, i) => ({
            day: `Day ${i + 1}`,
            balance: 10000 + i * 50 + Math.random() * 200,
            equity: 10200 + i * 60 + Math.random() * 250,
        })),
    },
    {
        id: 2,
        name: "Trader Bot A",
        deposits: 8000,
        withdrawals: 500,
        profit: 700,
        data: Array.from({ length: 30 }, (_, i) => ({
            day: `Day ${i + 1}`,
            balance: 7500 + i * 30 + Math.random() * 100,
            equity: 7700 + i * 35 + Math.random() * 120,
        })),
    },
    {
        id: 3,
        name: "Trader Bot B",
        deposits: 7000,
        withdrawals: 300,
        profit: -450,
        data: Array.from({ length: 30 }, (_, i) => ({
            day: `Day ${i + 1}`,
            balance: 6800 + i * 20 + Math.random() * 80,
            equity: 6900 + i * 22 + Math.random() * 90,
        })),
    },
]

export default function DashboardPage() {
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
                    <WalletConnect />
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

                    {/* GOS Claim */}
                    {/*<motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="p-6 bg-gray-900/80 rounded-2xl shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">GOS Holder Claim</h2>
                        <p className="text-gray-300 mb-4">Eligible old GOS holders can claim their AGS tokens here.</p>
                        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold hover:scale-105 transition">
                            Claim Tokens
                        </button>
                    </motion.div>*/}

                    {/* Trader Accounts */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        className="p-6 bg-gray-900/80 rounded-2xl shadow-lg col-span-1 md:col-span-2 lg:col-span-3"
                    >
                        <h2 className="text-xl font-semibold mb-6">Trader Accounts <i>(currently dummy-data, until tradingaccounts go live)</i></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {traderData.map((t, i) => (
                                <TraderCard key={i} {...t} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
