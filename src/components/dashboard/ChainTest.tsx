"use client";

import { useBlockNumber, useReadContract } from "wagmi";
import { icoAbi } from "@/abi/icoAbi";

export default function ChainTest() {
    const ICO_ADDRESS = "0xc00fa6253f113d6121a6fee116e5a97cd3d49627";

    const { data, isError, isLoading } = useBlockNumber({
        watch: true,
        chainId: 8453,
    });

    const { data: startTs } = useReadContract({
        address: ICO_ADDRESS,
        abi: icoAbi,
        functionName: "startTimestamp",
        chainId: 8453,
    });
    console.log("startTs =", startTs);

    return (
        <div className="text-white p-4 bg-gray-800 rounded">
            <h2 className="font-bold mb-2">Chain Connection Test</h2>

            {isLoading && <p>Loading block</p>}
            {isError && <p>Error fetching block!</p>}
            {data && <p>Latest Block: {data.toString()}</p>}
        </div>
    );
}
