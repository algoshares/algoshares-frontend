"use client"
import { motion } from "framer-motion"

export default function Roadmap() {
    const phases = [
        { title: "Phase 1 - Launch", text: "Token creation, ICO, and liquidity pool deployment." },
        { title: "Phase 2 - Growth", text: "Start trading strategies, bonding mechanics, and buyback loops." },
        { title: "Phase 3 - Expansion", text: "Scaling strategies and partnerships (traders and marketing)." },
    ]

    return (
        <section id="roadmap" className="relative py-24 px-6 text-center">
            {/* Background image */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-cover bg-center bg-[url('/bg-roadmap.png')]"
            />
            <div className="absolute inset-0 bg-black/60" />

            <h2 className="text-4xl font-bold mb-12 relative z-10">Roadmap</h2>
            <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                {phases.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 bg-gray-900 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                        <p className="text-gray-300">{p.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
