import prisma from "@/lib/prisma";
type CreateTestimonialLogoInput = Parameters<typeof prisma.testimonials.create>[0]["data"];
type UpdateTestimonialLogoInput = Parameters<typeof prisma.testimonials.update>[0]['data'];

export default async function getAll() {
    return await prisma.testimonials.findMany()
}

export async function getById(id:number) {
    return await prisma.testimonials.findUnique({where: {id : Number(id)}})
}

export async function getAllByFilter({ skip = 0, take }: { skip?: number; take?: number }) {
    return prisma.testimonials.findMany({
        skip: skip,
        ...(take !== undefined && { take: take }), 
    });
}

export async function createData(input : CreateTestimonialLogoInput) {
    return await prisma.testimonials.create({data: input})
}

export async function deleteData(id:number) {
    return await prisma.testimonials.delete({where: {id: Number(id)}})
}

export async function updateData(input: UpdateTestimonialLogoInput, id:number) {
    return await prisma.testimonials.update({
        where: {id:Number(id)}, 
        data: input
    })
}

export async function countAll() {
    return prisma.testimonials.count();
}
