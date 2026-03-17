import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const redirectUri = "https://2bdevon.top/api/auth/callback";

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email",
    prompt: "select_account",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
