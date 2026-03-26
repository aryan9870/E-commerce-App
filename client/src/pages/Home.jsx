import React from 'react'
import Hero from '../components/Hero'
import ProductSection from '../components/ProductSection'
import { useState, useEffect } from 'react'
import axios from 'axios'
import useUIStore from '../store/useUIStore'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {

  const API_URL = import.meta.env.VITE_API_URL;
  const [items, setItems] = useState([]);
  const { loading, setLoading } = useUIStore();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`);
      console.log(res.data.products);
      setItems(res.data.products);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  let newArrivals = items.slice(0, 4);
  let topSelling = items.filter(item => item.ratings >= 4).slice(0, 4);

  return loading ? <LoadingSpinner /> : (
    <div className='text-gray-600 tracking-wider'>
      <Hero />
      <div className='mx-20 max-sm:mx-5'>
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />
      </div>
      <div className='border border-gray-200 mx-20 my-10 max-sm:mx-5 max-sm:my-5'></div>
      <div className='mx-20 max-sm:mx-5'>
      <ProductSection title="TOP SELLING" products={topSelling} />
      </div>
    </div>
  )
}

export default Home