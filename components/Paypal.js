import {
    PayPalScriptProvider,
    PayPalHostedFieldsProvider,
    PayPalHostedField,
    usePayPalHostedFields,
} from "@paypal/react-paypal-js";

const SubmitPayment = () => {
    // Here declare the variable containing the hostedField instance
    const hostedFields = usePayPalHostedFields();

    const submitHandler = () => {
        if (typeof hostedFields.submit !== "function") return; 
        // validate that `submit()` exists before using it
        hostedFields
            .submit({
                // The full name as shown in the card and billing address
                cardholderName: "John Wick",
            })
            .then((order) => {
                fetch(
                    "/your-server-side-integration-endpoint/capture-payment-info"
                )
                    .then((response) => response.json())
                    .then((data) => {
                        // Inside the data you can find all the information related to the payment
                    })
                    .catch((err) => {
                        // Handle any error
                    });
            });
    };

    return <button onClick={submitHandler}>Realizar Pagamento</button>;
};

export default function Paypal() {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": "AUa4ae6NFHkh3KOrsNClZj0czw5o0KMBLhol2qbvbkqw02mwicRTYcOZ7rc6tvx8ic3qNh4bntP1ayoL",
                "data-client-token": process.env.PAYPAL_SECRET_KEY,
            }}
        >
            <PayPalHostedFieldsProvider
                createOrder={() => {
                    // Here define the call to create and order
                    return fetch(
                        "/your-server-side-integration-endpoint/orders"
                    )
                        .then((response) => response.json())
                        .then((order) => order.id)
                        .catch((err) => {
                            // Handle any error
                        });
                }}
            >
                <PayPalHostedField
                    id="card-number"
                    hostedFieldType="number"
                    options={{ selector: "#card-number" }}
                />
                <PayPalHostedField
                    id="cvv"
                    hostedFieldType="cvv"
                    options={{ selector: "#cvv" }}
                />
                <PayPalHostedField
                    id="expiration-date"
                    hostedFieldType="expirationDate"
                    options={{
                        selector: "#expiration-date",
                        placeholder: "MM/YY",
                    }}
                />
                <SubmitPayment />
            </PayPalHostedFieldsProvider>
        </PayPalScriptProvider>
    );
}