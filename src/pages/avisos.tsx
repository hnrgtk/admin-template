import { loadStripe } from "@stripe/stripe-js";
import { Layout } from "../components/Layout";

let stripePromise;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  }
  return stripePromise;
}

export default function Notification() {

  async function redirectCheckout() {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: "price_1KotebEw3mpQJbPYbsJIrLD0",
        quantity: 1,
      }],
      mode: "payment",
      successUrl: `${window.location.origin}/`,
      cancelUrl: `${window.location.origin}/ajustes`,
    });
    console.log('stripe_error:', error);
  }


  return (
    <Layout title="Notificações" subtitle="Template Admin!">
      <h3>Content!!</h3>
      <button onClick={redirectCheckout}>
        Checkout
      </button>
    </Layout>
  );
}
