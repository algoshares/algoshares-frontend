"use client";

import { motion } from "framer-motion";
import { WalletConnect } from "@/components/wallet-connect";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    const { isConnected } = useAccount();

    return (
        <section className="relative h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
            {/* Background image with parallax */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-[url('/bg-hero.webp')] bg-cover bg-center opacity-30"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black/95" />

            {/* Main content */}
            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative z-10 text-center max-w-3xl px-4"
            >
                <Image
                    src="/logo.png"
                    alt="AlgoShares Logo"
                    width={160}
                    height={160}
                    className="mx-auto mb-6 drop-shadow-lg"
                />

                <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                    AlgoShares
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-300">
                    A new era of algorithmic wealth building.
                    Powered by traders. Fueled by community.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    {isConnected ? (
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 rounded-xl font-semibold text-black shadow-lg"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <WalletConnect />
                    )}

                    <a
                        href="https://algoshares.gitbook.io/algoshares-docs/"
                        target="_blank"
                        className="px-6 py-3 border border-yellow-500 text-yellow-400 hover:bg-yellow-500/20 rounded-xl font-semibold shadow-lg"
                    >
                        Read Docs
                    </a>
                </div>
            </motion.div>
        </section>
    );
}