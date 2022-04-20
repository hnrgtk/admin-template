import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  }
  return stripePromise;
}

export default function Checkout() {
  async function redirectCheckout() {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: "price_1KotebEw3mpQJbPYbsJIrLD0",
        quantity: 1,
      }],
      mode: "payment",
      successUrl: `${window.location.origin}/login`,
      cancelUrl: `${window.location.origin}/ajustes`,
    });

    console.log('stripe_error:', error);
  }

  return (
    <>
      <h1>Checkout</h1>
      <button onClick={redirectCheckout}>
        Checkout
      </button>
    </>
  );
}
