"use client"

import { Navbar } from '@/components/navbar';
import Hero from "@/components/Hero";
import About from "@/components/About"
import Tokenomics from "@/components/Tokenomics"
import Utility from "@/components/Utility"
import Roadmap from "@/components/Roadmap"
import Footer from "@/components/Footer"
import BuyToken from "@/components/BuyToken"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function HomePage() {
    return (
        <main className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Tokenomics />
            <Utility />
            <Roadmap />
            <BuyToken />
            <Footer />
        </main>
    );
}
