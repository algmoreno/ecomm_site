import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'
import { useStateContext } from '../context/StateContext'
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  // const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   console.log("isMobile", isMobile)
  //   const mediaQuery = window.matchMedia("(max-width: 800px)");
  //   setIsMobile(mediaQuery.matches);

  //   const handleMediaQueryChange = (event) => {
  //     setIsMobile(event.matches)
  //   }

  //   mediaQuery.addEventListener("change", handleMediaQueryChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaQueryChange);
  //   }
  // }, []);

  return (
    <div className="navbar-container font-secondary">
      <p className="logo font-primary">
        <Link href="/">97 Spec.</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart /> }
    </div>
  )
}

export default Navbar