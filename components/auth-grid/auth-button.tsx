import { useFormStatus } from "react-dom"
export default function AuthButton() {
    const { pending } = useFormStatus() 
    return (
        <button type="submit" disabled={pending}>
            { pending ? 'Submitting...' : 'Login' }
        </button>
    )
}