"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { icoAbi } from "@/abi/icoAbi";
import { erc20Abi } from "@/abi/erc20Abi";

const ICO_ADDRESS = "0xc00fa6253f113d6121a6fee116e5a97cd3d49627";
const USDT_ADDRESS = "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2";

export default function ICOArea() {
    const { address, isConnected } = useAccount();
    const { writeContract } = useWriteContract();


    // read static config
    const { data: startTs } = useReadContract({ address: ICO_ADDRESS, abi: icoAbi, functionName: "startTimestamp", chainId: 8453 });
    const { data: endTs } = useReadContract({ address: ICO_ADDRESS, abi: icoAbi, functionName: "endTimestamp", chainId: 8453 });
    const { data: isOpenData } = useReadContract({ address: ICO_ADDRESS, abi: icoAbi, functionName: "isOpen", chainId: 8453 });

    // decimals (read from contract)
    const { data: agsDecimals } = useReadContract({ address: ICO_ADDRESS, abi: icoAbi, functionName: "agsTokenDecimals", chainId: 8453 });
    const { data: paymentDecimals } = useReadContract({ address: ICO_ADDRESS, abi: icoAbi, functionName: "paymentTokenDecimals", chainId: 8453 });

    // release schedule (two arrays)
    const { data: scheduleRaw } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "getReleaseSchedule",
        chainId: 8453
    });

    // user-specific reads (only when connected)
    const { data: allocated } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "allocatedOfView",
        args: [address],
        chainId: 8453
    });
    const { data: claimed } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "claimedOfView",
        args: [address],
        chainId: 8453
    });
    const { data: claimable } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "claimableOfView",
        args: [address],
        chainId: 8453
    });

    // max contribution per wallet (in payment token smallest units)
    const { data: maxContribution } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "maxContributionPerWallet",
        chainId: 8453
    });

    // USDT allowance for ICO
    const { data: allowance } = useReadContract({
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "allowance",
        args: address ? [address, ICO_ADDRESS] : undefined, // undefined disables the call
        chainId: 8453,
    });

    const { data: available } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "availableAGSinContract",
        chainId: 8453
    });

    // local UI state
    const [nowMs, setNowMs] = useState(() => Date.now());
    const [depositAmount, setDepositAmount] = useState(""); // human input (USDT whole/decimal e.g. "1000")
    const [txHashPending, setTxHashPending] = useState<string | null>(null);

    async function handleApprove(event?: React.MouseEvent<HTMLButtonElement>) {
        if (!depositAmount) return alert("Enter amount to approve");
        const amt = parseUnits(depositAmount, pd);

        try {
            const tx = await writeContract({
                address: USDT_ADDRESS,
                abi: erc20Abi,
                functionName: "approve",
                args: [ICO_ADDRESS, amt],
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert("Approve failed");
            }
        }
    }

    async function handleDeposit(event?: React.MouseEvent<HTMLButtonElement>) {
        if (!depositAmount) return alert("Enter amount to deposit");
        const amt = parseUnits(depositAmount, pd);

        try {
            const tx = await writeContract({
                address: ICO_ADDRESS,
                abi: icoAbi,
                functionName: "buy",
                args: [amt],
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert("Deposit failed");
            }
        }
    }

    async function handleClaim() {
        try {
            const tx = await writeContract({
                address: ICO_ADDRESS,
                abi: icoAbi,
                functionName: "claim",
            });
        } catch (e: unknown) {
            if (e instanceof Error) {
                alert(e.message);
            } else {
                alert("Claim failed");
            }
        }
    }

    // small refresh loop for countdown / realtime updates
    useEffect(() => {
        const id = setInterval(() => setNowMs(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    // convenience values
    const startTimestampNumber = startTs ? Number(startTs.toString()) * 1000 : null;
    const endTimestampNumber = endTs ? Number(endTs.toString()) * 1000 : null;
    const openOnChain = Boolean(isOpenData);

    const pd = (paymentDecimals ?? 6) as number; // fallback 6
    const ad = (agsDecimals ?? 6) as number;

    // schedule arrays normalized
    const schedule = useMemo(() => {
        if (!scheduleRaw) return { ts: [] as number[], bps: [] as number[] };
        // scheduleRaw is a tuple [uint256[], uint256[]]
        const [tsArr, bpsArr] = scheduleRaw as [bigint[], bigint[]];
        const ts = tsArr.map(v => Number(v));      // convert bigint -> number
        const bps = bpsArr.map(v => Number(v));
        return { ts, bps };
    }, [scheduleRaw]);

    // countdown
    const timeLeft = useMemo(() => {
        if (!startTimestampNumber) return null;
        const diff = startTimestampNumber - nowMs;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return { days, hours, minutes, seconds, finished: false };
    }, [startTimestampNumber, nowMs]);

    // formatted numbers
    const allocatedFormatted = allocated ? formatUnits(allocated as bigint, 6) : "0";
    const claimedFormatted = claimed ? formatUnits(claimed as bigint, 6) : "0";
    const claimableFormatted = claimable ? formatUnits(claimable as bigint, 6) : "0";

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

    // approval / buy handlers
    const needsApproval = useMemo(() => {
        if (!allowance) return true;
        try {
            const want = depositAmount ? parseUnits(depositAmount, pd) : BigInt(0);
            const allowanceBn: bigint = allowance as bigint; // cast from Wagmi return
            return allowanceBn < want;
        } catch {
            return true;
        }
    }, [allowance, depositAmount, pd]);

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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-200">ICO</h3>
                <div className="text-sm text-gray-400">
                    {openOnChain ? <span className="text-green-400">Open</span> : <span>Not open</span>}
                </div>
            </div>

            {/* Countdown */}
            {timeLeft && !timeLeft.finished ? (
                <div className="mb-4">
                    <p className="text-sm text-gray-300 mb-2">Starts in</p>
                    <div className="flex gap-3">
                        <div className="bg-gray-800 px-3 py-2 rounded text-center">
                            <div className="text-xl font-bold text-yellow-400">{timeLeft.days}</div>
                            <div className="text-xs text-gray-400">days</div>
                        </div>
                        <div className="bg-gray-800 px-3 py-2 rounded text-center">
                            <div className="text-xl font-bold text-yellow-400">{timeLeft.hours}</div>
                            <div className="text-xs text-gray-400">hours</div>
                        </div>
                        <div className="bg-gray-800 px-3 py-2 rounded text-center">
                            <div className="text-xl font-bold text-yellow-400">{timeLeft.minutes}</div>
                            <div className="text-xs text-gray-400">minutes</div>
                        </div>
                        <div className="bg-gray-800 px-3 py-2 rounded text-center">
                            <div className="text-xl font-bold text-yellow-400">{timeLeft.seconds}</div>
                            <div className="text-xs text-gray-400">seconds</div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Deposit area (only when connected) */}
            {isConnected && (
                <>
                    <div className="mb-4">
                        <label className="text-sm text-gray-300 block mb-2">Deposit USDT</label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
                                placeholder="Amount (USDT)"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                                inputMode="decimal"
                            />
                            {needsApproval ? (
                                <button className="px-4 py-2 rounded bg-yellow-600 text-black font-bold" onClick={handleApprove}>
                                    Approve
                                </button>
                            ) : (
                                <button className="px-4 py-2 rounded bg-yellow-600 text-black font-bold" onClick={handleDeposit}>
                                    Deposit
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            Max per wallet: {maxContribution ? formatUnits(maxContribution as bigint, pd) : "-"} USDT
                        </p>
                        <p className="text-xs text-gray-400">Available AGS in contract: {formatUnits(available as bigint ?? BigInt(0), 6)}</p>
                        <p className="text-xs text-gray-400">Price per AGS: 0.0045 USDT (launchprice 0.0050 USDT)</p>
                    </div>
                </>
            )}

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
                            const vestedFormatted = formatUnits(r.vested, ad);
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
