import prisma from "@/lib/prisma";
type CreateInput = Parameters<typeof prisma.insights.create>[0]["data"];
type UpdateInput = Parameters<typeof prisma.insights.update>[0]['data'];

export default async function getAll() {
    return await prisma.insights.findMany()
}

export async function getById(id:number) {
    return await prisma.insights.findUnique({where: {id : Number(id)}})
}

export async function getBySlug(slug:String) {
    return await prisma.insights.findFirst({ where: { slug: String(slug) } });
}

export async function getAllByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.insights.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function createData(input : CreateInput) {
    return await prisma.insights.create({data: input})
}

export async function deleteData(id:number) {
    return await prisma.insights.delete({where: {id: Number(id)}})
}

export async function updateData(input: UpdateInput, id:number) {
    return await prisma.insights.update({
        where: {id:Number(id)}, 
        data: input
    })
}

export async function countAll() {
    return prisma.insights.count();
}
