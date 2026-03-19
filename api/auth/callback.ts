import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  if (!code) return res.redirect("/?error=no_code");

  const redirectUri = "https://2bdevon.top/api/auth/callback";

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code as string,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return res.redirect("/?error=token_failed");

  const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const userData = await userRes.json();

  if (userData.email !== process.env.ADMIN_EMAIL) {
    return res.redirect("/?error=unauthorized");
  }

  res.setHeader(
    "Set-Cookie",
    `admin_session=${process.env.SESSION_SECRET}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=86400`
  );
  res.redirect("/");
}
