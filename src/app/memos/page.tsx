import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import MemosList from "../../components/MemosList";

export default async function MemosPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <MemosList 
      user={{ firstName: user.firstName, username: user.username }} 
    />
  );
} 