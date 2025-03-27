import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import MemoDetail from "../../../components/MemoDetail";

export default async function MemoDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  return <MemoDetail id={params.id} />;
} 