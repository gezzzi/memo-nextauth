import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import NewMemoForm from "@/components/NewMemoForm";

export default async function NewMemoPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return <NewMemoForm />;
} 