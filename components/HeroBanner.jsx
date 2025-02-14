import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container font-tertiary">
      <div>
        <p className="beats-solo">
          
        </p>
        <h3>
        {heroBanner.midText}
        </h3>
        <h1>
        {heroBanner.largeText1}
        </h1>        
        <div>
          <Link href={`/product/${heroBanner.product}`}>
          <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
          </Link>
          <div className="desc">
            <h5>  
            </h5>
            <p>
              {heroBanner.desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroBanner