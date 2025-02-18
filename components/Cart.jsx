import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineShopping, AiOutlineMinus, AiOutlinePlus, AiOutlineLeft } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const session = await response.json();
    console.log(session)
    toast.loading('Redirecting...');
    window.location.href = session.url;
  }

  return (
    <div className="cart-wrapper font-tertiary" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading font-tertiary">Your Cart:</span>
          <span className="cart-num-items">{totalQuantities} items</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart font-tertiary">
            <AiOutlineShopping style={{ margin: "auto"}} size={150} />
            <h3>Your cart is empty.</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btn font-tertiary">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" alt="" />
              <div className="item-desc">
                <div className="flex-top">
                  <h5>{item.name}</h5>
                  <h4>{item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                      <span className="num" onClick="">{item.quantity}</span>
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                    </p>
                  </div>
                  <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Proceed to Check Out
              </button>
            </div>             
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart