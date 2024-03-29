import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { async } from "@firebase/util";

const CheckoutForm = ({ orders }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(" ");
  const [success, setSuccess] = useState(" ");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState(" ");
  const [clientSecret, setClientSecret] = useState(" ");
  const { paymentAmount, billerName, billerPhone, billerAdders, email, _id } =
    orders;

  //   console.log(
  //     "price222222222222222222222222222222222222222222222",
  //     paymentAmount
  //   );
  useEffect(() => {
    fetch(
      "https://manufacturer-website-server-side-amb7.onrender.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ paymentAmount }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [paymentAmount]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || " ");

    setSuccess(" ");
    setProcessing(true);
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: billerName,
            email: email,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      console.log(paymentIntent);
      setTransactionId(paymentIntent.id);
      setSuccess("Your Payment is Completed");

      const payment = {
        order: _id,
        transactionId: paymentIntent.id,
      };
      fetch(
        `https://manufacturer-website-server-side-amb7.onrender.com/orders/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payment),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs btn-success mt-6 "
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500 text-center">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success}</p>
          <p>
            Your transaction Id:
            <span className="text-orange-600">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
