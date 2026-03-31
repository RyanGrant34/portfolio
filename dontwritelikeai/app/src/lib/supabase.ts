import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type UserRecord = {
  id: string;
  clerk_id: string;
  email: string;
  plan: "free" | "pro";
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  rewrites_today: number;
  last_rewrite_date: string | null;
  created_at: string;
};

// Get or create user record
export async function getOrCreateUser(
  clerkId: string,
  email: string
): Promise<UserRecord> {
  const { data: existing } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (existing) return existing as UserRecord;

  const { data: created, error } = await supabase
    .from("users")
    .insert({ clerk_id: clerkId, email, plan: "free" })
    .select()
    .single();

  if (error) throw error;
  return created as UserRecord;
}

// Increment rewrite count, reset if new day
export async function trackRewrite(clerkId: string): Promise<{
  allowed: boolean;
  remaining: number;
  plan: string;
}> {
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (!user) throw new Error("User not found");

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = user.last_rewrite_date !== today;
  const currentCount = isNewDay ? 0 : user.rewrites_today;

  // Pro users have no limit
  if (user.plan === "pro") {
    await supabase
      .from("users")
      .update({
        rewrites_today: currentCount + 1,
        last_rewrite_date: today,
      })
      .eq("clerk_id", clerkId);

    return { allowed: true, remaining: -1, plan: "pro" };
  }

  // Free users: 3 per day
  const FREE_LIMIT = 3;
  if (currentCount >= FREE_LIMIT) {
    return { allowed: false, remaining: 0, plan: "free" };
  }

  await supabase
    .from("users")
    .update({
      rewrites_today: currentCount + 1,
      last_rewrite_date: today,
    })
    .eq("clerk_id", clerkId);

  return {
    allowed: true,
    remaining: FREE_LIMIT - currentCount - 1,
    plan: "free",
  };
}
