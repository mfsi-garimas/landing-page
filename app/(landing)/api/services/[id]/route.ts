import { NextResponse } from "next/server";
import {getById, deleteData, updateData} from "@/lib/data/services";

export async function GET(req: Request, context: { params: Promise<{id: number}> }) {
    const {id} =  await context.params;
    const record = await getById(id);
    if(!record) return NextResponse.json({error: "Not Found"})
    return NextResponse.json(record)
}

export async function DELETE(req: Request, context: { params: Promise<{id: number}> }) {
    const {id} =  await context.params;
    const result = await deleteData(id);
    if(result) return NextResponse.json({success: true})
    return NextResponse.json({ success: false, error: 'Failed to remove record' }, { status: 500 })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: number }> }) {
    try {
        const awaitedParams = await params;
        const body = await req.json()
        const updated = await updateData(body, awaitedParams.id)
        if(updated) {
            return NextResponse.json({
                id: updated.id,
                title: updated.title
            });
        }
        return NextResponse.json({success:true})
    } catch(error: any) {
        if (error.code === 'P2000') {
            return NextResponse.json(
                { error: 'One of the fields is too long for the database column' },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Failed to update record' },
            { status: 500 }
        );
    }

}