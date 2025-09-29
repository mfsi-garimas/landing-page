import { NextResponse } from "next/server";
import {getAllByFilter, countAll} from "@/lib/data/contact";


export async function GET(req: Request) {
    const url = new URL(req.url)
    const _page = Number(url.searchParams.get("_page") || 1)
    const _limit = Number(url.searchParams.get("_limit") || 10)
    const skip = (_page -1) * _limit
    const [items, total] = await Promise.all([
        getAllByFilter({skip, take: _limit}),
        countAll() 
    ])

    const rangeEnd = _page + items.length - 1;
    const response = NextResponse.json(items);
    response.headers.set(
        'Content-Range', 
        `services ${_page}-${rangeEnd}/${total}`
    );

    return response;
}