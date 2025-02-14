import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: { discount, smallText, midText, largeText1, largeText2, desc, saleTime, product, buttonText, image } }) => {
  return (
    <div className="footer-banner-container font-tertiary">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <Link href={`/product/${product}`}>
            <img src={urlFor(image)} className="footer-banner-image" alt="footer" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FooterBanner