import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import MemosList from "../../components/MemosList";

export default async function MemosPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <MemosList 
      user={{ 
        firstName: session.user?.name?.split(' ')[0] || null, 
        username: session.user?.email || null 
      }} 
    />
  );
} 