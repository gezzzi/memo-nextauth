import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import NewMemoForm from "@/components/NewMemoForm";

export default async function NewMemoPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in");
  }

  return <NewMemoForm />;
} 