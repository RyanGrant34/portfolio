import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress || "";

  try {
    const user = await getOrCreateUser(userId, email);
    const today = new Date().toISOString().split("T")[0];
    const isNewDay = user.last_rewrite_date !== today;
    const rewritesToday = isNewDay ? 0 : user.rewrites_today;
    const FREE_LIMIT = 3;

    return NextResponse.json({
      plan: user.plan,
      email: user.email,
      rewrites_today: rewritesToday,
      remaining: user.plan === "pro" ? -1 : FREE_LIMIT - rewritesToday,
      created_at: user.created_at,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to load user data" },
      { status: 500 }
    );
  }
}
