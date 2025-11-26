'use client'

import { motion } from "framer-motion"
import { useState } from "react"

export default function SIPArea() {
    type Plan = {
        duration: string;
        discount: string;
    };

    const [showModal, setShowModal] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    const plans = [
        { duration: "1 Month", discount: "5%" },
        { duration: "3 Months", discount: "10%" },
        { duration: "6 Months", discount: "20%" },
    ]

    const myInvestments = [
        { id: 1, amount: 1000, duration: "6 Months", start: "2025-01-01", claimable: "40%" },
        { id: 2, amount: 500, duration: "12 Months", start: "2025-02-15", claimable: "0%" },
    ]

    return (
        <section className="p-6 bg-gray-900/80 rounded-2xl shadow-lg relative z-10">

            {/* Available allocation */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300">Available SIP Allocation</p>
                <p className="text-2xl font-bold text-gold">5,000 AGS</p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.duration}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                        viewport={{ once: true }}
                        className="p-6 bg-gray-800 rounded-xl shadow-lg text-center"
                    >
                        <h3 className="text-xl font-semibold mb-2">{plan.duration}</h3>
                        <p className="text-gray-400 mb-4">Discount:<br />{plan.discount}</p>
                        <button
                            className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold hover:scale-105 transition"
                            onClick={() => { setSelectedPlan(plan); setShowModal(true); }}
                        >
                            Lock In
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* My Investments */}
            <h3 className="text-xl font-semibold mb-4">My Running SIP Investments</h3>
            <div className="space-y-4">
                {myInvestments.map(inv => (
                    <div key={inv.id} className="p-4 bg-gray-800 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">{inv.amount} AGS</p>
                            <p className="text-gray-400 text-sm">{inv.duration} - Started {inv.start}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gold font-semibold">{inv.claimable} claimable</span>
                            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold hover:scale-105 transition">
                                Claim
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-gray-900 p-6 rounded-2xl shadow-xl max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Confirm Investment</h3>
                        <p className="text-gray-300 mb-4">
                            Lock into <span className="text-gold font-semibold">{selectedPlan?.duration}</span> plan with{" "}
                            <span className="text-gold">{selectedPlan?.discount} discount</span>.
                        </p>
                        <input
                            type="number"
                            placeholder="Enter amount in USD"
                            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white"
                        />
                        <div className="flex gap-4">
                            <button
                                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold"
                                onClick={() => setShowModal(false)}
                            >
                                Confirm
                            </button>
                            <button
                                className="flex-1 py-2 rounded-lg bg-gray-700 text-white font-bold"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
