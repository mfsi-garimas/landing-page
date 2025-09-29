import prisma from "@/lib/prisma";
type CreateInput = Parameters<typeof prisma.contact.create>[0]["data"];


export async function createData(input : CreateInput) {
    return await prisma.contact.create({data: input})
}

export async function getAllByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.contact.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function countAll() {
    return prisma.contact.count();
}
