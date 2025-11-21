"use client"
import { motion } from "framer-motion"

export default function Utility() {
    const items = [
        { title: "Bonding", text: "Holders can bond taxed tokens at a discount. Longer bonding = higher discount." },
        { title: "Trader Profits", text: "50% compounded into strategies, 50% distributed with buyback, reserves, and team." },
        { title: "Buyback & Burn", text: "Automated buybacks with 70% of allocations create a deflationary token model." },
    ]

    return (
        <section className="py-24 px-6 text-center bg-gradient-to-b from-gray-950 via-black to-gray-950 to-black">
            <h2 className="text-4xl font-bold mb-10">Utility & Value Loops</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, i) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 bg-gray-900 rounded-2xl shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                        <p className="text-gray-300">{item.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
