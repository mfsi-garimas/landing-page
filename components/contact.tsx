"use client"
import { useActionState } from "react";
import { handleSubmit } from "@/lib/handleSubmit";
import Image from "next/image";
export default function Contact() {
    const [state, formAction] =useActionState(handleSubmit, {errors: null})
    return (
        <section className="contact-section container" id="contact">
            <div className="contact-card row">
            <div className="col-12 col-md-6 contact-left">
                <div className="contact-content">
                <Image width="400" height="400" src="/images/child-avatar-illustration-happy-boy-avatar-cartoon-user-portrait-user-profile-icon_118339-4378.jpg" alt="3D Illustration" className="img-fluid d-block mx-auto mb-4 contact-div" />
                <h2 className="text-center">CONTACT US</h2>
                <p className="text-center">Talk with us to know how we can make you a part of a thriving digital landscape.</p>
                <div className="icon-box d-flex align-items-center mb-3">
                    <i className="bi bi-telephone-fill"></i>
                    <div>
                    <small className="d-block text-muted">Phone</small>
                    <p className="mb-0">+1 315 308 0901</p>
                    </div>
                </div>
                <div className="icon-box d-flex align-items-center">
                    <i className="bi bi-envelope-fill"></i>
                    <div>
                    <small className="d-block text-muted">Email</small>
                    <p className="mb-0">sales@chromezy.com</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6 contact-right">
                <h4 className="form-title">Let&apos;s Talk!</h4>
                {( state.message && state.errors == null) && (<p className="formStatus">{state.message}</p>)}
                <form action={formAction}>
                <div className="mb-3">
                    <input type="text" name="name" className="form-control" placeholder="What's your name?" required />
                    {state.errors?.name && (<div className="text-red-500 text-sm">{state.errors.name[0]}</div>)}
                </div>
                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="What's your email address?" required />
                    {state.errors?.email && (<div className="text-red-500 text-sm">{state.errors.email[0]}</div>)}
                </div>
                <div className="mb-3">
                    <input type="tel" name="phone" className="form-control" placeholder="What's your phone number?"  required/>
                    {state.errors?.phone && (<div className="text-red-500 text-sm">{state.errors.phone[0]}</div>)}
                </div>
                <div className="mb-3">
                    <textarea className="form-control" name="message" placeholder="How can we help you?" required></textarea>
                    {state.errors?.message && (<div className="text-red-500 text-sm">{state.errors.message[0]}</div>)}
                </div>
                <button type="submit" className="btn btn-request">Send Request</button>
                </form>
            </div>
            </div>
        </section>
    )
}