import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Parse the URL to get the `id` from the route
    const { pathname } = new URL(req.url);
    const parts = pathname.split("/");
    const traderId = parts[parts.length - 1]; // last segment = id

    const backendUrl = `http://54.80.219.224:3010/GetTraderCardData?trader_id=${traderId}`;

    const res = await fetch(backendUrl, { cache: "no-store" });
    if (!res.ok) {
        return NextResponse.json({ error: "Backend error" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
