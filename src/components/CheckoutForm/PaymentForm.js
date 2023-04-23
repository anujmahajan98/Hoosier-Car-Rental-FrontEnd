import './PaymentForm.css'
import {PaymentElement} from '@stripe/react-stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#000000",
			fontWeight: 300,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#000000"
		}
	}
}


export default function PaymentForm(props){
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const docs = props;
    console.log("In paymentForm")
    const price = docs.data[0].price 
    const userEmail = docs.data[1]
    // console.log("userEmail is ", userEmail)
    const ownerEmail = docs.data[0].ownerEmail 
    // console.log("ownerEmail is",ownerEmail)
    const carType = docs.data[0].carType 
    const carCompany = docs.data[0].carCompany 
    const carModel = docs.data[0].carModel 
    const carNumber = docs.data[0].carNumber 
    const ownerName = docs.data[0].ownerName 
    // console.log("ownerName is ",ownerName)
    // console.log("data is",docs.data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if(!error) 
        {
            try 
            {
                const {id} = paymentMethod
                const paymentDate = new Date().toISOString().substring(0, 10);
                fetch('https://hoosier-backend.onrender.com/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({PaymentId:id, price:price, ownerEmail:ownerEmail,userEmail: userEmail, carType: carType, 
                    carModel:carModel, carCompany: carCompany, 
                     carNumber: carNumber, ownerName:ownerName, paymentDate:paymentDate})
              })
              .then(response => response.json())
                .then(data => {
                    console.log("tried sending the data to")
                    if(data.success) {
                        console.log("Successful payment")
                        console.log("paymentDate is",paymentDate)
                        setSuccess(true)
                    }
                })
            
            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }
    
    return(
        // style={{ width: "50%", padding: "10px", }}
        <>
        {!success ? 
        <form style={{marginTop: '10px'}} onSubmit={handleSubmit}>
            <fieldset className="FormGroup" style={{maxWidth: '500px', alignItems: 'center'}}>
                <div className="FormRow" style={{maxWidth: '500px'}}>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button style={{display: 'block',
                    fontsize: '16px',
                    height: '50px',
                    width: "calc(100% - 200px)",
                    maxWidth: '500px',
                    margin: '40px 15px 0',
                    backgroundColor: '#f6a4eb',
                    boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6',
                    borderRadius: '4px',
                    color: '#fff',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 100ms ease-in-out',
                    willChange: 'transform, background-color, box-shadow',
                    border: 'none'}}>Pay</button>
        </form>
        :
       <div>
           <h1>You just rented a car. Congrats!! </h1>
       </div> 
        }
            
        </>
    )
}
