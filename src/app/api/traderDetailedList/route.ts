import { NextRequest, NextResponse } from "next/server";

// Define the trade type
interface TradeRow {
    datetime: number; // unix seconds
    action: string;
    pair: string;
    lots: number;
    entry: number;
    exit: number;
    profit: number;
    commission: number;
    swap: number;
    netting: number;
}

interface TraderDetailedApiResponse {
    trades: TradeRow[];
}

export async function GET(request: NextRequest) {
    try {
        const traderId = request.nextUrl.searchParams.get("trader_id");
        if (!traderId) {
            return NextResponse.json({ error: "Missing trader_id" }, { status: 400 });
        }

        // Fetch from the backend
        const backendUrl = `http://54.80.219.224:3010/GetTraderDetailedList?trader_id=${traderId}`;
        const res = await fetch(backendUrl);
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch backend data" }, { status: 500 });
        }

        const json: TraderDetailedApiResponse = await res.json();

        return NextResponse.json(json, { status: 200 });
    } catch (err) {
        console.error("API error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
