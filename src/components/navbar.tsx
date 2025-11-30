'use client';

import Link from 'next/link';
import { WalletConnect } from './wallet-connect';
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CustomConnectButton } from "@/components/CustomConnectButton";

export function Navbar() {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [open, setOpen] = useState(false);

    return (
        <nav className="w-full bg-black/80 backdrop-blur text-white border-b border-white/10">
            <div className="px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 h-[70px]">
                    <Image
                        src="/logo.png"
                        width={70}
                        height={70}
                        alt="AlgoShares Logo"
                    />
                    <span
                        className="text-2xl font-bold tracking-wide leading-none"
                        style={{ marginBottom: "8px" }}
                    >
                        AlgoShares
                    </span>
                </Link>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/#roadmap">Roadmap</Link>
                    <Link href="https://algoshares.gitbook.io/algoshares-docs/" target="_blank">Docs</Link>
                    <Link href="https://discord.gg/PP7vunQfAe" target="_blank">Discord</Link>

                    {isConnected ? (
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                            <CustomConnectButton />
                    )}

                    {isConnected && (
                        <button
                            onClick={() => disconnect()}
                            className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition shadow flex items-center justify-center"
                            title="Disconnect"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden bg-black/95 border-t border-white/10">
                    <div className="flex flex-col p-4 gap-4 text-lg">

                        <Link href="/#roadmap" onClick={() => setOpen(false)} className="text-white/90">
                            Roadmap
                        </Link>

                        <a
                            href="https://algoshares.gitbook.io/algoshares-docs/"
                            target="_blank"
                            onClick={() => setOpen(false)}
                            className="text-white/90"
                        >
                            Docs
                        </a>

                        <a
                            href="https://discord.gg/PP7vunQfAe"
                            target="_blank"
                            onClick={() => setOpen(false)}
                            className="text-white/90"
                        >
                            Discord
                        </a>

                        {isConnected ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow"
                                >
                                    Dashboard
                                </Link>

                                <button
                                    onClick={() => {
                                        disconnect();
                                        setOpen(false);
                                    }}
                                    className="p-3 rounded-lg bg-red-600 hover:bg-red-500 transition shadow flex items-center gap-2"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Disconnect
                                </button>
                            </>
                        ) : (
                            <div onClick={() => setOpen(false)}>
                                <WalletConnect />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
