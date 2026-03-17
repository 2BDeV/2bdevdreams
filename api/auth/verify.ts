import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const cookies = req.headers.cookie || "";
  const sessionCookie = cookies.split(";").find((c: string) => c.trim().startsWith("admin_session="));
  const sessionValue = sessionCookie?.split("=")[1]?.trim();

  if (sessionValue === process.env.SESSION_SECRET) {
    return res.status(200).json({ isAdmin: true });
  }
  return res.status(401).json({ isAdmin: false });
}
