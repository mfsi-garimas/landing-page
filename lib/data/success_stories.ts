import prisma from "@/lib/prisma";
type CreateInput = Parameters<typeof prisma.successStories.create>[0]["data"];
type UpdateInput = Parameters<typeof prisma.successStories.update>[0]['data'];

export default async function getAll() {
    return await prisma.successStories.findMany()
}

export async function getBySlug(slug:String) {
    return await prisma.successStories.findFirst({ where: { slug: String(slug) } });
}

export async function getById(id:number) {
    return await prisma.successStories.findUnique({where: {id : Number(id)}})
}

export async function getAllByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.successStories.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function createData(input : CreateInput) {
    return await prisma.successStories.create({data: input})
}

export async function deleteData(id:number) {
    return await prisma.successStories.delete({where: {id: Number(id)}})
}

export async function updateData(input: UpdateInput, id:number) {
    return await prisma.successStories.update({
        where: {id:Number(id)}, 
        data: input
    })
}

export async function countAll() {
    return prisma.successStories.count();
}
