"use server"
import { z } from 'zod'
import { getUser } from '@/lib/data/user';
import { createAuthSession, destroySession } from './auth';
import { redirect } from 'next/navigation';
type FormState = {
    errors: {
        email?: string[];
        password?: string[];
    } | null;
};
const schema = z.object({
        email: z.string()
            .email('Invalid email format')
            .min(1, 'Email is required'),
        password: z.string()
            .min(1, 'Password is required'),
        })
export async function userLogin(prev:FormState,formData:FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const data =({
        email, password
    })
    const validatedData = schema.safeParse(data)
    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    const userExists = await getUser({email, password})
    if(!userExists) {
        return {
            errors: {
                email :[ 'Invalid Credentials']
            }
        }
    }

    await createAuthSession(userExists) 
    redirect('/admin')
    return {
            errors: null
        }
}

export default async function logout() {
    await destroySession()
    redirect('/admin/login')
  }