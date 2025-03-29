import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import MemoDetail from "../../../components/MemoDetail";

export default async function MemoDetailPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in");
  }

  return <MemoDetail id={params.id} />;
} 