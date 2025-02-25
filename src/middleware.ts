import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const authHeader = request.headers.get("authorization");

  // 環境変数からユーザー名・パスワードを取得
  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER;
  const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数が設定されていない場合は認証をスキップ
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
    return NextResponse.next();
  }

  // 認証ヘッダーがない場合は 401 エラーを返す
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  // ベーシック認証のユーザー名とパスワードをデコード
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = atob(base64Credentials).split(":");
  const username = credentials[0];
  const password = credentials[1];

  // 認証情報が正しくない場合は 401 エラーを返す
  if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
    });
  }

  // 認証成功 → 次の処理へ
  return NextResponse.next();
}
 
// ベーシック認証を適用するルートを指定（すべてのページに適用）
export const config = {
  matcher: "/:path*",
};
