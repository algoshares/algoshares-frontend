export interface TraderCardDailyData {
    date: string;
    balance: number;
    profitPercent: number;
}

export interface TraderCardApiResponse {
    name: string;
    deposits: number;
    withdrawals: number;
    profit: number;
    dailyGraph: TraderCardDailyData[];
}

export async function getTraderCardData(traderId: number): Promise<TraderCardApiResponse> {
    const url = `http://54.80.219.224:3010/GetTraderCardData?trader_id=${traderId}`;

    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch trader data");
    }

    const json: TraderCardApiResponse = await res.json();
    return json;
}