// // import { useLocation } from 'react-router-dom';
// // import StripeContainer from '../CheckoutForm/StripeContainer';
// // import './payments.css';
// // function payments(props) {
// //     const location = useLocation();
// //     const docs = location.state.data[0];
// //     const userEmail = location.state.data[1];
// //     return(
// //         <div>
// //             <StripeContainer userEmail={userEmail}/>
// //         </div>
// //     );

    
// // }
// // export default payments;

// import { useLocation } from 'react-router-dom';
// import StripeContainer from '../CheckoutForm/StripeContainer';
// import './payments.css';

// function Payments() {
//   const location = useLocation();
//   const docs = location.state.data[0];
//   const userEmail = location.state.data[1];

//   return (
//     <div>
//       <StripeContainer userEmail={userEmail} />
//     </div>
//   );
// }

// export default Payments;

import { useLocation } from 'react-router-dom';
import StripeContainer from '../CheckoutForm/StripeContainer';
import axios from 'axios';

function Payments() {
  const location = useLocation();
  const docs = location.state.data;
  const userEmail = location.state.data[1];
  console.log(docs)
  console.log(userEmail)

  const handlePaymentSuccess = async (data) => {
    console.log('Payment successful!', data);
    const receivedData = { ...data, userEmail };
    try {
      const res = await axios.post('/api/payments/success', receivedData);
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  return (
    <div>
      <StripeContainer data={docs} />
    </div>
  );
}

export default Payments;
