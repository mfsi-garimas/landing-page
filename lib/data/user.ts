import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"
type userData = {
    email: string;
    password: string;
}

async function verifyPassword(plainPassword: string, hashedPassword: string) {
  return await bcrypt.compare(plainPassword, hashedPassword)

}
async function getUserbyEmail(email:string) {
    return await prisma.user.findFirst({where : {email}})
}

export async function getUser(data:userData) {
    const userDetails = await getUserbyEmail(data.email)
    if(userDetails) {
         const compare = await verifyPassword(data.password, userDetails.password)
         if(compare) {
            return userDetails.id
         }
    }
    
    return false
}

