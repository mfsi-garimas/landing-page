import { NextResponse } from "next/server";
import {getById, deleteData} from "@/lib/data/client_logo";
export async function GET(req: Request, context: { params: Promise<{id: string}> }) {
    const {id} =  await context.params;
    const record = await getById(Number(id));
    if(!record) return NextResponse.json({error: "Not Found"})
    return NextResponse.json(record)
}

export async function DELETE(req: Request, context: { params: Promise<{id: number}> }) {
    const {id} =  await context.params;
    const result = await deleteData(id);
    if(result) return NextResponse.json({success: true})
    return NextResponse.json({ success: false, error: 'Failed to remove record' }, { status: 500 })
}