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
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-6 inline-block px-5 py-3 bg-green-600 rounded-full font-semibold shadow-lg text-black animate-pulse"
                >
                    <a
                        href="https://app.uniswap.org/swap?chain=base&inputCurrency=0xfde4c96c8593536e31f229ea8f37b2ada2699bb2&outputCurrency=0xd1f2E436599dCCe2B189e053C0F0e78B2Df704eA"
                        target="_blank"
                    >
                        Click here to buy $AGS on Uniswap
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}
