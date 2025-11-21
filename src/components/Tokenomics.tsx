"use client"
import { motion } from "framer-motion"

export default function Tokenomics() {
    const stats = [
        { label: "Supply", value: "200,000,000" },
        { label: "Sell Tax", value: "2%" },
        { label: "Bonding Discount", value: "Up to 20%" },
    ]

    return (
        <section id="tokenomics" className="relative py-24 px-6 text-center bg-gray-950">
            {/* Background image */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/bg-tokenomics.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60" /> {/* Overlay for readability */}
            </motion.div>

            {/* Foreground content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <h2 className="text-4xl font-bold mb-12">Tokenomics</h2>
                <p className="text-lg text-gray-300 mb-8">
                    The AGS token powers the AlgoShares ecosystem: trading, bonding, and value loops that keep momentum alive.
                </p>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="p-6 bg-gray-900 rounded-2xl shadow-lg"
                        >
                            <p className="text-2xl font-bold text-gold mb-2">{s.value}</p>
                            <p className="text-gray-400">{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
