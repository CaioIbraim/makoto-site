import { PaymentForm } from "../components/PaymentForm";

const Pagamento = (props) => {
  const { clientToken, clientID } = props;
  return (
        <PaymentForm clientToken={clientToken} clientID={clientID} />
    
  );
};

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/tokens");
  const data = await response.json();
  const { client_token } = data;
  const { PAYPAL_CLIENT_KEY } = process.env;

  return {
    props: {
      clientToken: client_token,
      clientID: PAYPAL_CLIENT_KEY
    }
  };
};

export default Pagamento;
