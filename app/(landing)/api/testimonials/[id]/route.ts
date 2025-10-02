import { NextResponse } from "next/server";
import {getById, deleteData, updateData} from "@/lib/data/testimonials";
import cloudinary from "@/lib/cloudinary";
import generateRandomId from "@/lib/generate_random";

export async function GET(req: Request, context: { params: Promise<{id: string}> }) {
    const {id} =  await context.params;
    const record = await getById(Number(id));
    if(!record) return NextResponse.json({error: "Not Found"})
    return NextResponse.json(record)
}

export async function DELETE(req: Request, context: { params: Promise<{id: string}> }) {
    const {id} =  await context.params;
    const result = await deleteData(Number(id));
    if(result) return NextResponse.json({success: true})
    return NextResponse.json({ success: false, error: 'Failed to remove record' }, { status: 500 })
}

export async function PUT(req: Request, context: { params: Promise<{id: string}> }) {
    const {id} =  await context.params;

    const body = await req.json();
    const { name, image, message, company } = body;
    let updated;
    if (image?.src) {
        const base64 = image.src.replace(/^data:.+;base64,/, "");
        const buffer = Buffer.from(base64, "base64");
        const imageName = generateRandomId()
        const uploadPromise = () =>
            new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "client_logo", public_id: imageName },
                (error, result) => {
                if (error) reject(error);
                else resolve(result);
                }
            );
            stream.end(buffer);
            });

        const result: any = await uploadPromise();
         updated = await updateData({ name, clientLogo: result.secure_url, company, message}, Number(id))
    } else {
        updated = await updateData({ name, company, message}, Number(id))
    }
    if (updated) {
      return NextResponse.json({
                id:updated.id,
                name: updated.name,
                company: updated.company
      });
    } else {
      return NextResponse.json({ success: false, error: 'Failed to update record' }, { status: 500 });
    }

}
