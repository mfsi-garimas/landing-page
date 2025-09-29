
"use server"
import z from "zod"
import { createData } from "./data/contact";
type FormState = {
    message?: string;
    errors: {
        name?: string[];
        email?: string[];
        phone?: string[];
        message?: string[];
    } | null;
};
export async function handleSubmit(prev:FormState, formData: FormData): Promise<FormState> {
        "use server"
        const data ={
            name: formData.get('name')?.toString() || "",
            email: formData.get('email')?.toString() || "",
            phone: formData.get('phone')?.toString() || "",
            message: formData.get('message')?.toString() || ""
        }
        const validation = z.object({
            name: z.string().min(1, 'Name is required'),
            email: z.string()
            .email('Invalid email format')
            .min(1, 'Email is required'),
            phone: z.string()
                .min(10, 'Phone number must be of 10 characters') 
                .max(10, 'Phone number must be of 10 characters')
                .regex(/^\d+$/, 'Phone number must only contain numbers'),
            message: z.string().min(1, 'Message is required'),
        });

        const validatedData = validation.safeParse(data);
        if (!validatedData.success) {
            return {
                message: 'Validation failed.',
                errors: validatedData.error.flatten().fieldErrors,
            };
        }
        const {name,email, phone,message} = data
        const result = await createData({name,email,phone,message})
        
        return {
            message: 'Message sent successfully!',
            errors: null
        };
    }