import React from 'react'
import Link from 'next/link'

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">
          {heroBanner.smallText}
        </p>
        <h3>
          mid
        </h3>
        <img src="" alt="headphones" className="hero-banner-image" />

        <div>
          <Link href="/product/ID">
            <button type='button'>button text</button>
          </Link>
          <div className="desc">
            <h5>  
              Description
            </h5>
            <p>
              Description
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroBanner