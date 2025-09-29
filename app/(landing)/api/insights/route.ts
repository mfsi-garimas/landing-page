import { NextResponse } from "next/server";
import {getAllByFilter, countAll , createData} from "@/lib/data/insights";
import slugify from "slugify";
import cloudinary from "@/lib/cloudinary";
import generateRandomId from "@/lib/generate_random";

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


export async function POST(req: Request) {
  const body = await req.json();
  const { title, image, summary, description } = body;
  const slug = slugify(title, {lower:true})


  if (!image?.src) {
    return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
  }

  const base64 = image.src.replace(/^data:.+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  const imageName =generateRandomId();

  const uploadPromise = () =>
    new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "testimonials", public_id: imageName  },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

  const result: any = await uploadPromise();

  const data = await createData({ title, image: result.secure_url, summary, description, slug});

  if(data) {
    return NextResponse.json({
        id: data.id,
        title,
        summary,
        description,
        image: {
          src: result.secure_url,
          title: imageName,
        },
    });
  } else {
        return NextResponse.json({ success: false, error: 'Failed to create record' }, { status: 500 });
  }

}