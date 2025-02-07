import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>
          Trending Products
        </h2>
        <p>
          A Variety of Speakers
        </p>
      </div>

      <div>
        {['Product 1', 'Product 2'].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  )
}

export default Home