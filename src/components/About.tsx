"use client"
import { motion } from "framer-motion"

export default function About() {
    return (
        <section className="relative py-24 px-6 text-center bg-gray-950 overflow-hidden">
            

            {/* Foreground content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-3xl mx-auto"
            >
                <h2 className="text-4xl font-bold mb-6">About AlgoShares</h2>
                <p className="text-lg text-gray-300">
                    AlgoShares combines algorithmic trading with community-driven tokenomics. Hold, bond, and share in profits - while fueling continuous buybacks and burns.
                </p>
            </motion.div>
        </section>
    )
}
