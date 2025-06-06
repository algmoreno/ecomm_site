import React, { useState, useContext } from 'react'
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0)
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container font-tertiary">
        <div className="image-container-main">
          <div className="product-detail-image">
            <img src={urlFor(image && image[0])} alt="" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)} key={i} alt="other products" 
                className={i === index  ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)} />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <div className="product-detail-desc-box">
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                (20)
              </p>
            </div>
            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
              </p>
            </div>
            <div className="buttons">
              <button type="button" className="add-to-cart font-tertiary" onClick={() => onAdd(product, qty)}>
                Add to Cart
              </button>
              <button type="button" className="buy-now font-tertiary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
         
      </div>
      
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  // querying current product
  const query = `*[_type == "product"] {
    slug {
      current 
    }
  }`

  // fetching all product slugs
  const products = await client.fetch(query);
  // restructuring product slugs
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
    
  }))
  // exporting paths 
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  // querying product that matches current product slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  // querying all products for track
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery)


  return {
    props: { products, product }
  }
}

export default ProductDetails