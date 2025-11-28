"use client";

import React, { useMemo } from "react";
import { formatUnits } from "viem";

interface ICORaisedSliderProps {
    totalRaised: bigint | undefined; // from contract
    paymentDecimals: number;
    maxUSDT?: bigint;       // optional override, default 504,000
    softCap?: bigint;       // optional override, default 50,000
}

export function ICORaisedSlider({
    totalRaised,
    paymentDecimals
}: ICORaisedSliderProps) {
    const raised = totalRaised ?? BigInt(0);
    const maxUSDT = BigInt(504000000000);
    const softCap = BigInt(50000000000);

    const percentRaised = useMemo(() => {
        return Number((raised * BigInt(10000)) / maxUSDT) / 100; // percent with 2 decimals
    }, [raised, maxUSDT]);

    const softCapPercent = useMemo(() => {
        return Number((softCap * BigInt(100)) / maxUSDT);
    }, [softCap, maxUSDT]);

    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Raised: {formatUnits(raised, paymentDecimals)} USDT</span>
                <span>Max: {formatUnits(maxUSDT, paymentDecimals)} USDT</span>
            </div>

            <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                {/* actual raised bar */}
                <div
                    className="absolute left-0 top-0 h-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${percentRaised}%` }}
                ></div>

                {/* softcap line */}
                <div
                    className="absolute top-0 h-full border-l border-green-400"
                    style={{ left: `${softCapPercent}%` }}
                ></div>
            </div>
        </div>
    );
}
