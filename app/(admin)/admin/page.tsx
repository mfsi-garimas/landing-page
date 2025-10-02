import AdminPageClient from "./admin_page_client";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import styles from './page.module.css'
import logout from "@/lib/user-login";
export default async function AdminPage() {
  const result = await verifyAuth()
  if(!result.user) {
    redirect('/admin/login')
  }
  return (
    <>
    <form action={logout}>
      <button className={styles.logout_button}>Logout</button>
    </form>
    <AdminPageClient />
    </>
  );
}