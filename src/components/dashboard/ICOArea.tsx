"use client"

import { useEffect, useState } from "react"

export default function ICOArea() {
    // ICO end date/time (Oct 7, 2025 15:00 CET)
    const targetDate = new Date("2025-11-28T09:00:00Z") // 11:00 CET = 09:00 UTC
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    function calculateTimeLeft() {
        const difference = +targetDate - +new Date()
        let time: { days: number; hours: number; minutes: number; seconds: number } = {
            days: 0, hours: 0, minutes: 0, seconds: 0
        }

        if (difference > 0) {
            time = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return time
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div>
            <p className="text-lg text-gray-300 mb-4">
                Participate in the ICO will be possible in:
            </p>

            {/* Countdown */}
            <div className="flex justify-center gap-6 text-center mb-6">
                {Object.entries(timeLeft).map(([label, value]) => (
                    <div key={label} className="bg-gray-800 px-4 py-3 rounded-lg shadow-md">
                        <p className="text-3xl font-bold text-yellow-500">{value}</p>
                        <p className="text-xs uppercase text-gray-400">{label}</p>
                    </div>
                ))}
            </div>

            {/* CTA button */}
            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold hover:scale-105 transition">
                Join ICO
            </button>
        </div>
    )
}
