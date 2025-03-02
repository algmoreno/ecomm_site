import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [])
  
  return (
    <div className="success-wrapper font-tertiary">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order.</h2>
        <p className="email-msg">
          Check your inbox for receipt.
        </p>
        <p className="description">
          For any questions, please email
          <a email="email" href="mailto:order@example.com">order@example.com</a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn font-tertiary">
            Continue Shopping 
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success