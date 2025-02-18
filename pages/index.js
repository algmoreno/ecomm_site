import React from 'react'
import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = ({ products, bannerData }) => {

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />

      <div className="products-container font-secondary">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;