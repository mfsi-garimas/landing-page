import prisma from "@/lib/prisma";
type CreateClientLogoInput = Parameters<typeof prisma.clientLogo.create>[0]["data"];
type UpdateClientLogoInput = Parameters<typeof prisma.clientLogo.update>[0]['data'];

export default async function getAllClientLogo() {
    return await prisma.clientLogo.findMany()
}

export async function getById(id:number) {
    return await prisma.clientLogo.findUnique({where: {id : Number(id)}})
}

export async function getAllByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.clientLogo.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function createData(input : CreateClientLogoInput) {
    return await prisma.clientLogo.create({data: input})
}

export async function deleteData(id:number) {
    return await prisma.clientLogo.delete({where: {id: Number(id)}})
}

export async function updateData(input: UpdateClientLogoInput, id:number) {
    return await prisma.clientLogo.update({
        where: {id:Number(id)}, 
        data: input
    })
}

export async function countAll() {
    return prisma.clientLogo.count();
}
