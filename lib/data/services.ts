import prisma from "@/lib/prisma";
type CreateServiceInput = Parameters<typeof prisma.services.create>[0]["data"];
type UpdateServiceInput = Parameters<typeof prisma.services.update>[0]['data'];

export async function getAllServices() {
    await new Promise(resolve => setTimeout(resolve, 5000))
    return await prisma.services.findMany()
}

export async function getById(id:number) {
    return await prisma.services.findUnique({where: {id : Number(id)}})
}

export async function getAllServicesByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.services.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function createData(input : CreateServiceInput) {
    return await prisma.services.create({data: input})
}

export async function deleteData(id:number) {
    return await prisma.services.delete({where: {id: Number(id)}})
}

export async function updateData(input: UpdateServiceInput, id:number) {
    return await prisma.services.update({
        where: {id:Number(id)}, 
        data: input
    })
}

export async function countAllServices() {
    return prisma.services.count();
}
