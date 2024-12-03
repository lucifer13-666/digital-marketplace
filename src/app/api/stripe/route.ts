import ProductEmail from "@/components/ProductEmail";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }
  console.log("event type", event.type);

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const link = session.metadata?.link;
      const { data, error } = await resend.emails.send({
        from: "Gametamin <onboarding@resend.dev>",
        to: ["hardtimeinlife.686@gmail.com"],
        subject: "Your product from Gametamin",
        react: ProductEmail({ link: link as string }),
      });

      if (error) {
        console.log(error);
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  return new Response(null, { status: 200 });
}
