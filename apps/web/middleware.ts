export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard", "/chat/:path*", "/globalchat/:path*"] };
