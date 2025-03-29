// サンプルユーザー（メモリ内ストレージ - サーバー再起動時にリセットされます）
export const users = [
  {
    id: "1",
    name: "テストユーザー",
    email: "test@example.com",
    password: "password123",
  },
];

// ユーザーをメールアドレスで検索
export function findUserByEmail(email: string) {
  return users.find(user => user.email === email);
}

// 新規ユーザー登録関数（メモリ内配列に追加するだけ）
export function registerUser(name: string, email: string, password: string) {
  // メールアドレスが既に使用されているかチェック
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return { success: false, error: "このメールアドレスは既に使用されています" };
  }

  // 新しいユーザーを追加
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
  };
  
  users.push(newUser);
  
  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
} 