"use client"
import { signIn } from "next-auth/react"
export default function SignIn(e:Event) {
    async function handleSubmit(formData:FormData) {
        const email = formData.get("email")
        const password = formData.get("password")
        e.preventDefault()
        await  signIn("credentials",{email,password,callbackUrl:"admin"})
    }
    return (
        <form action={handleSubmit}>
            <input type="email" name="email" required />
            <input type="password" name="password" required />
            <button type="submit">Submit</button>
        </form>
    )
}