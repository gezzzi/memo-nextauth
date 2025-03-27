import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import MemoEdit from "../../../../components/MemoEdit";

// 仮のメモデータ
const dummyMemos = [
  { id: "1", title: "買い物リスト", content: "牛乳、卵、パン", createdAt: "2023-05-01" },
  { id: "2", title: "会議メモ", content: "プロジェクトの進捗確認", createdAt: "2023-05-02" },
  { id: "3", title: "アイデアメモ", content: "新しいアプリの機能案", createdAt: "2023-05-03" },
];

export default async function EditMemoPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }

  const memo = dummyMemos.find(memo => memo.id === params.id);
  
  if (!memo) {
    redirect("/memos");
  }

  return <MemoEdit id={params.id} />;
} 