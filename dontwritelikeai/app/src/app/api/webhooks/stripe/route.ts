import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkId = session.metadata?.clerk_id;
      if (clerkId && session.subscription) {
        await supabase
          .from("users")
          .update({
            plan: "pro",
            stripe_subscription_id: session.subscription as string,
          })
          .eq("clerk_id", clerkId);
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("users")
        .update({ plan: "free", stripe_subscription_id: null })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.status === "active") {
        await supabase
          .from("users")
          .update({ plan: "pro" })
          .eq("stripe_subscription_id", subscription.id);
      } else if (
        subscription.status === "canceled" ||
        subscription.status === "unpaid"
      ) {
        await supabase
          .from("users")
          .update({ plan: "free" })
          .eq("stripe_subscription_id", subscription.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
