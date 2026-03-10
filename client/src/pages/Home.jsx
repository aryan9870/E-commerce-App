import React from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import { products } from '../assets/assets'

const Home = () => {
  return (
    <div>
      <Hero />
      <ProductSection title="NEW ARRIVALS" products={products} />
      <div className='border border-gray-200 mx-20 my-10 max-sm:mx-5 max-sm:my-5'></div>
      <ProductSection title="TOP SELLING" products={products} />
    </div>
  )
}

export default Home