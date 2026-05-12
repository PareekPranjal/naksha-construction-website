import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization") ?? "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (token !== secret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  let body: { paths?: unknown; layout?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const paths = Array.isArray(body.paths)
    ? body.paths.filter((p): p is string => typeof p === "string" && p.startsWith("/"))
    : [];
  const layout = body.layout === true;

  if (paths.length === 0) {
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: ["/"], layout: true });
  }

  for (const p of paths) {
    revalidatePath(p, layout ? "layout" : "page");
  }
  return NextResponse.json({ revalidated: paths, layout });
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "POST to revalidate" });
}
