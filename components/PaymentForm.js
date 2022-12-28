import styles from "./CardForm.module.css";
import { useState, useRef } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields
} from "@paypal/react-paypal-js";

import { TailSpin } from "react-loader-spinner";
import React from 'react';
export const PaymentForm = React.forwardRef((props, ref) => {
  const [loader, showLoader] = useState(false);
  const [success, showSuccess] = useState(false);
  const [error, showErrorMsg] = useState(false);
  const [transactionData, setTransactionData] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const SubmitPayment = React.forwardRef((ref) => {
    // Here declare the variable containing the hostedField instance
    const { cardFields } = usePayPalHostedFields();
    const cardHolderName = useRef(null);

  

    return (
      <button
      onClick={() => {
        // Código a ser executado quando o botão for clicado
        if (typeof cardFields.submit !== "function") {return}
      // validate that `submit()` exists before using it
      if (errorMsg) showErrorMsg(false);
      showLoader(true);
      showSuccess(false);
      cardFields
        .submit({
          // The full name as shown in the card and billing addresss
          // These fields are optional for Sandbox but mandatory for production integration
          cardholderName: cardHolderName?.current?.value
        })
        .then((order) => {
          const { orderId } = order;
          fetch(`/api/payments/${orderId}`)
            .then((response) => response.json())
            .then((data) => {
              showLoader(false);
              showSuccess(true);
              setTransactionData(data);
              // Inside the data you can find all the information related to the payment
            })
            .catch((err) => {
              // Handle capture order error
              showLoader(false);
              showErrorMsg(true);
              setErrorMsg(err);
            });
        })
        .catch((err) => {
          // Handle validate card fields error
          showLoader(false);
          showErrorMsg(true);
          setErrorMsg(err);
        });
      }}
        className="w-full bg-indigo-500 p-7 rounded-md"
        style={{ display: "flex" }}
      >
        Pagar
      </button>
    );
  });

  return (
    <>
   
    <PayPalScriptProvider
     
      options={{
        "client-id": props.clientID,
        "data-client-token": props.clientToken,
        components: "hosted-fields"
      }}
      onRender={() => {
        // Código a ser executado quando o script for carregado
      }}

    >
      <PayPalHostedFieldsProvider
        createOrder={() => {
          // Here define the call to create and order
          return fetch("/api/payments")
            .then((response) => response.json())
            .then((order) => order.id)
            .catch((err) => {
              // Handle order creation error
              showLoader(false);
              showErrorMsg(true);
              setErrorMsg(err);
            });
        }}
        onError={(error) => {
          // Código para tratar erros durante o processamento do pagamento
        }}
      >
        <section className={styles.container}>
          <h3 style={{ textAlign: "center", margin: 10 }}>
            PayPal Custom Checkout
            <small className="text-muted"> With Orders API</small>
          </h3>
         
          <div className={styles.card_container}>
            <label htmlFor="card-number">Card Number</label>
            <PayPalHostedField
              id="card-number"
              hostedFieldType="number"
              options={{
                selector: "#card-number",
                placeholder: "4111 1111 1111 1111"
              }}
              className={styles.card_field}
            />
            <section style={{ display: "flex" }}>
              <div style={{ flexDirection: "column", marginRight: "10px" }}>
                <label htmlFor="cvv">CVV</label>
                <PayPalHostedField
                  id="cvv"
                  hostedFieldType="cvv"
                  options={{
                    selector: "#cvv",
                    placeholder: "123"
                  }}
                  className={styles.card_field}
                />
              </div>
              <div style={{ flexDirection: "column" }}>
                <label htmlFor="expiration-date">Expiration Date</label>
                <PayPalHostedField
                  id="expiration-date"
                  hostedFieldType="expirationDate"
                  className={styles.card_field}
                  options={{
                    selector: "#expiration-date",
                    placeholder: "MM/YY"
                  }}
                />
              </div>
            </section>

            <label title="This represents the full name as shown in the card">
              Card Holder Name
            </label>
            <input
              id="card-holder"
              className={styles.card_field}
              type="text"
              placeholder="Full name"
            />
            <label title="billing address street">Billing Address </label>
            <input
              id="card-billing-address-street"
              className={styles.card_field}
              type="text"
              placeholder="street"
            />
            <label title="billing address unit">Unit </label>
            <input
              id="card-billing-address-unit"
              className={styles.card_field}
              type="text"
              placeholder="unit"
            />
            <label title="billing address city">City </label>
            <input
              id="card-billing-address-unit"
              className={styles.card_field}
              style={{ display: "block" }}
              type="text"
              placeholder="city"
            />
            <label title="billing address state">State</label>
            <input
              id="card-billing-address-state"
              className={styles.card_field}
              type="text"
              placeholder="state"
            />
            <label title="billing address zip">Zip</label>
            <input
              id="card-billing-address-zip"
              className={styles.card_field}
              type="text"
              placeholder="zip"
            />
            <label title="billing address country">Country</label>
            <input
              id="card-billing-address-country"
              className={styles.card_field}
              type="text"
              placeholder="country"
            />

            {loader && <TailSpin height="50" width="50" color="#0d6efd" />}
            {!loader && <SubmitPayment />}
            {success && (
              <p style={{ color: "green", margin: "10px" }}>
                Transaction Completed! {JSON.stringify(transactionData)}
              </p>
            )}
            {error && (
              <p style={{ color: "red", margin: "10px" }}>
                Sorry, there is an error {JSON.stringify(errorMsg)}
              </p>
            )}
          </div>
        </section>
      </PayPalHostedFieldsProvider>
    </PayPalScriptProvider>

    </>
    
  );
});
