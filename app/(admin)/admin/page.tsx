import { getServerSession } from "next-auth";
import AdminPageClient from "./admin_page_client";

export default async function AdminPage() {
  const session = await getServerSession();
  return <AdminPageClient session={session} />;
}