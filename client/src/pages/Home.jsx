import React from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import { products } from '../assets/assets'

const Home = () => {
  return (
    <div className='text-gray-600 tracking-wider'>
      <Hero />
      <div className='mx-20 max-sm:mx-5'>
      <ProductSection title="NEW ARRIVALS" products={products} />
      </div>
      <div className='border border-gray-200 mx-20 my-10 max-sm:mx-5 max-sm:my-5'></div>
      <div className='mx-20 max-sm:mx-5'>
      <ProductSection title="TOP SELLING" products={products} />
      </div>
    </div>
  )
}

export default Home