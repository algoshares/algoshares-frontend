"use client"
import { motion } from "framer-motion"

export default function BuyToken() {
    return (
        <section className="py-24 px-6 text-center bg-gradient-to-b from-gray-950 via-black to-gray-950 to-black">

            {/* Foreground content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-bold mb-6">How to buy the token</h2>
                <p className="text-lg text-gray-300">
                    Currently, we are awaiting the start of the ICO (will be expected 28th of November 2025).
                </p>
            </motion.div>
        </section>
    )
}
