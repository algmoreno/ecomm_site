import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
  if(!stripePromise) {
    stripePromise = loadStripe(`${process.env.stripe_publishable_key}`);
  }

  return stripePromise;
}

export default getStripe;