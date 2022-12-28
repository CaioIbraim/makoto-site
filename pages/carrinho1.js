import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "../components/Navbar"
import { useRouter } from 'next/router'

//Importing actions from  cart.slice.js
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cart.slice';
import styles from '../styles/CartPage.module.css';

const CartPage = () => {
  const router = useRouter()
    
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const finalizar = () => {
    router.push({pathname: '/finalizar'}) 
  }


  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    )
  }

  return (

    <>
      <Navbar />
      <div className={styles.container}>
        {cart.length === 0 ? (
          <h1>Seu carrinho está vazio</h1>
        ) : (
          <>
            <div className={styles.header}>
              <div>Imagem</div>
              <div>Produto</div>
              <div>Preço</div>
              <div>Quantidade</div>
              <div>Ações</div>
              <div>Total</div>
            </div>
            {cart.map((item) => (
              <div className={styles.body}>
                <div className={styles.image}>
                  <Image src={item.img_url} height="90" width="65" />
                </div>
                <p>{item.title}</p>
                <p> {item.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</p>
                <p>{item.quantity}</p>
                <div className={styles.buttons}>
                  <button onClick={() => dispatch(incrementQuantity(item.id_produto))}>
                    +
                  </button>
                  <button onClick={() => dispatch(decrementQuantity(item.id_produto))}>
                    -
                  </button>
                  <button onClick={() => dispatch(removeFromCart(item.id_produto))}>
                    x
                  </button>
                </div>
                <p> {(item.quantity * item.price).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</p>
              </div>
            ))}
            <h2>Total:  {getTotalPrice().toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</h2>
          </>
        )}
      </div>
      <button
        className='text-right bg-red-600 text-white py-4 px-12 mt-4 mb-4 block mx-auto hover:bg-red-800' onClick={finalizar}>Finalizar compra
      </button>
                
    </>
  );
};

export default CartPage;