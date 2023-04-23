// import React, { useState } from "react";
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import PaymentForm from "./PaymentForm";

// const PUBLIC_KEY = 'pk_test_51MtDztDZYF0NiiQaLZpBVFQj7xIWZFg34J8uDGvH5qK9ZNB5qWajQII3lCYQ0BV8M5bIWvW9b93WCKnrB9VC4rxp00UoBq3OHL'
// const stripeTestPromise = loadStripe(PUBLIC_KEY)

// export default function StripeContainer(props){
//     const { userEmail } = props;
//     return(
//         <Elements stripe={stripeTestPromise}>
//             <PaymentForm userEmail={userEmail}/>
//         </Elements>
//     )
// }

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51MtDztDZYF0NiiQaLZpBVFQj7xIWZFg34J8uDGvH5qK9ZNB5qWajQII3lCYQ0BV8M5bIWvW9b93WCKnrB9VC4rxp00UoBq3OHL";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(props) {
  const docs  = props;
  const cardetails=docs.data[0]
  const data = [cardetails]
  const userEmail = docs.data[1]
  data.push(userEmail)
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm data={data} />
    </Elements>
  );
}
