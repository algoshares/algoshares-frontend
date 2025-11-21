'use client';

import Link from 'next/link';
import { WalletConnect } from './wallet-connect';
import { useAccount, useDisconnect } from 'wagmi';
import { LogOut } from 'lucide-react'; // icon
import Image from 'next/image';

export function Navbar() {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur text-white">
            <Link href="/" className="flex items-center gap-3 h-[70px]">
                <Image
                    src="/logo.png"
                    width={70}
                    height={70}
                    alt="AlgoShares Logo"
                />
                <span className="text-2xl font-bold tracking-wide leading-none" style={{ marginBottom:"8px" }}>AlgoShares</span>
            </Link>
            <div className="flex items-center gap-6">
                <Link href="/#roadmap" className="hidden md:inline">Roadmap</Link>
                <Link href="https://algoshares.gitbook.io/algoshares-docs/" target="_blank">Docs</Link>
                <Link href="https://discord.gg/PP7vunQfAe" target="_blank">Discord</Link>
                {/* <WalletConnect /> */}
                {isConnected ? (
                    // When connected -> Show Dashboard button
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-semibold shadow hover:scale-105 transition"
                    >
                        Dashboard
                    </Link>
                ) : (
                    // When disconnected -> Show WalletConnect
                    <WalletConnect />
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
        </nav>
    );
}
