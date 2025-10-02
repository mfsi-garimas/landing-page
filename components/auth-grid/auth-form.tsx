"use client"
import Link from "next/link"
import { useActionState } from "react"
import { userLogin } from "@/lib/user-login"
import styles from './auth-form.module.css'
export default function AuthForm() {
    const [state, formAction] =useActionState(userLogin, {
        errors: null
    })
    return (
        <form className={styles.auth_form} action={formAction}>

            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"  />
            </p>
            {state.errors?.email && (
                <div className={styles.error}>{state.errors.email[0]}</div>
            )}
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
            </p>
            {state.errors?.password && (
                <div className={styles.error}>{state.errors.password[0]}</div>
            )}
            <p>
                <button type="submit">
                Login
                </button>
            </p>
        </form>
    )
}