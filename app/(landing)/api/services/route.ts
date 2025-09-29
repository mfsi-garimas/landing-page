import { NextResponse } from "next/server";
import {getAllServicesByFilter, getById, countAllServices , createData, deleteData, updateData} from "@/lib/data/services";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const _page = Number(url.searchParams.get("_page") || 1)
    const _limit = Number(url.searchParams.get("_limit") || 10)
    const skip = (_page -1) * _limit
    const [items, total] = await Promise.all([
        getAllServicesByFilter({skip, take: _limit}),
        countAllServices() 
    ])

    const rangeEnd = _page + items.length - 1;
    const response = NextResponse.json(items);
    response.headers.set(
        'Content-Range', 
        `services ${_page}-${rangeEnd}/${total}`
    );

    return response;
}

export async function POST(req:Request) {
    const body = await req.json()
    const service = await createData(body)
    if(service) {
        return NextResponse.json(service)
    } else {
        return NextResponse.json({ success: false, error: 'Failed to update record' }, { status: 500 })
    }
}