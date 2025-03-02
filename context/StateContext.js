import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    // check if product already in cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id)

    // increasing price and quantity
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart){          
      // if product already in cart, increasing the quantity of that product
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct, // leaving the rest of the object the same
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    }
    else {
      // if product isn't already in cart, add new cartItem object to array
      product.quantity = quantity;
      // leaving the rest of the cartItems array the same and adding product object
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to the cart.`)
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -= foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];

    if(value === 'inc'){
      foundProduct.quantity += 1;
      newCartItems[index] = foundProduct; 
      setCartItems(newCartItems)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    }
    else if (value === 'dec'){
      if (foundProduct.quantity > 1){
        foundProduct.quantity -= 1;
        newCartItems[index] = foundProduct; 
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider value={{ showCart, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice, totalQuantities, 
                              setTotalQuantities, qty, incQty, decQty, onAdd, onRemove, toggleCartItemQuantity }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);