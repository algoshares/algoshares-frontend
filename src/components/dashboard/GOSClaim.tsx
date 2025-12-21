"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { preseedAbi } from "@/abi/preseedAbi";

const PRESEED_ADDRESS = "0xCb628215df5F2b78cD84CF47cA589C352520f770";

export default function ICOArea() {
    const { address, isConnected } = useAccount();
    const { writeContract } = useWriteContract();
    const { writeContractAsync } = useWriteContract();
    const { switchChain } = useSwitchChain();

    const [txHashPending, setTxHashPending] = useState<string | null>(null);

    // release schedule (two arrays)
    const { data: scheduleRaw } = useReadContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "getReleaseSchedule",
        chainId: 8453
    });

    // user-specific reads (only when connected)
    const { data: allocated } = useReadContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "allocatedOfView",
        args: [address],
        chainId: 8453
    });
    const { data: claimed } = useReadContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "claimedOfView",
        args: [address],
        chainId: 8453
    });
    const { data: claimable } = useReadContract({
        address: PRESEED_ADDRESS,
        abi: preseedAbi,
        functionName: "claimableOfView",
        args: [address],
        chainId: 8453
    });
    const { data: agsDecimals } = useReadContract({ address: PRESEED_ADDRESS, abi: preseedAbi, functionName: "agsTokenDecimals", chainId: 8453 });

    async function handleClaim() {
        await switchChain({ chainId: 8453 });

        try {
            const tx = await writeContract({
                address: PRESEED_ADDRESS,
                abi: preseedAbi,
                functionName: "claim",
                chainId: 8453
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert("Claim failed");
            }
        }
    }

    // schedule arrays normalized
    const schedule = useMemo(() => {
        if (!scheduleRaw) return { ts: [] as number[], bps: [] as number[] };
        // scheduleRaw is a tuple [uint256[], uint256[]]
        const [tsArr, bpsArr] = scheduleRaw as [bigint[], bigint[]];
        const ts = tsArr.map(v => Number(v));      // convert bigint -> number
        const bps = bpsArr.map(v => Number(v));
        return { ts, bps };
    }, [scheduleRaw]);

    // formatted numbers
    const allocatedFormatted = allocated ? Number(formatUnits(allocated as bigint, 6)).toFixed(2) : "0";
    const claimedFormatted = claimed ? Number(formatUnits(claimed as bigint, 6)).toFixed(2) : "0";
    const claimableFormatted = claimable ? Number(formatUnits(claimable as bigint, 6)).toFixed(2) : "0";

    const ad = (agsDecimals ?? 6) as number;

    // utility: compute amounts per schedule entry for this user (vested amounts at each timestamp)
    const scheduleRows = useMemo(() => {
        // show for each release timestamp:
        // timestamp, bps, vested amount at that timestamp, claimable portion (vested - claimed up to that timestamp)
        if (!schedule.ts.length) return [];
        const allocBN: bigint = allocated != null ? (allocated as bigint) : BigInt(0);
        let cumulativeBps = 0;
        const rows = schedule.ts.map((t, i) => {
            cumulativeBps += schedule.bps[i] ?? 0;
            // vested amount at this timestamp:
            const vested = (allocBN * BigInt(cumulativeBps)) / BigInt(10000);
            return {
                timestamp: t,
                bps: schedule.bps[i] ?? 0,
                cumulativeBps,
                vested // BigNumber in AGS smallest units
            };
        });
        return rows;
    }, [schedule, allocated]);

    // helper to format timestamp to readable date
    const formatDate = (unix: number) => {
        try {
            const d = new Date(unix * 1000);
            return d.toLocaleString();
        } catch {
            return String(unix);
        }
    };

    // optionally show tx pending / wait for completion (simple poll)
    useEffect(() => {
        if (!txHashPending) return;
        const id = setInterval(() => {
            // simple: clear after 60s; you can use useWaitForTransaction from wagmi for better handling
            // we just clear the indicator after some time and rely on other reads to show results
        }, 1000);
        const ttl = setTimeout(() => {
            setTxHashPending(null);
            clearInterval(id);
        }, 60000);
        return () => {
            clearInterval(id);
            clearTimeout(ttl);
        };
    }, [txHashPending]);

    return (
        <div className="p-6 bg-gray-900/60 rounded-xl border border-gray-700 shadow-lg">

            {/* User allocations */}
            <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="bg-gray-800 p-3 rounded">
                    <p className="text-xs text-gray-400">Allocated</p>
                    <div className="font-semibold text-yellow-400">{allocatedFormatted} AGS</div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                    <p className="text-xs text-gray-400">Claimed</p>
                    <div className="font-semibold text-yellow-400">{claimedFormatted} AGS</div>
                </div>
                <div className="bg-gray-800 p-3 rounded col-span-2">
                    <p className="text-xs text-gray-400">Claimable</p>
                    <div className="font-semibold text-green-400">{claimableFormatted} AGS</div>
                </div>
            </div>

            {/* Schedule table */}
            <div className="mb-4">
                <p className="text-sm text-gray-300 mb-2">Vesting schedule</p>
                <div className="bg-gray-800 rounded overflow-hidden text-xs">
                    <div className="grid grid-cols-3 gap-2 p-2 border-b border-gray-700 text-gray-400">
                        <div>Date</div>
                        <div className="text-center">Released %</div>
                        <div className="text-right">Vested (AGS)</div>
                    </div>

                    {scheduleRows.length === 0 ? (
                        <div className="p-3 text-gray-400">Schedule not set</div>
                    ) : (
                        scheduleRows.map((r, idx) => {
                            const vestedFormatted = Number(formatUnits(r.vested, ad)).toFixed(2);
                            return (
                                <div key={idx} className="grid grid-cols-3 gap-2 p-2 border-b border-gray-800 items-center">
                                    <div className="text-gray-200">{formatDate(r.timestamp)}</div>
                                    <div className="text-center text-gray-300">{((r.bps ?? 0) / 100).toFixed(2)}%</div>
                                    <div className="text-right text-yellow-400">{vestedFormatted}</div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Claim button */}
            <div>
                <button
                    onClick={handleClaim}
                    disabled={!claimable || (claimable as bigint) <= BigInt(0)}
                    className={`w-full py-2 rounded font-semibold transition ${claimable && (claimable as bigint) > BigInt(0)
                        ? "bg-green-600 text-black hover:bg-green-500"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    Claim
                </button>
            </div>

            {/* pending tx */}
            {txHashPending && (
                <div className="mt-3 text-xs text-gray-300">Pending tx: {txHashPending}</div>
            )}

        </div>
    );
}