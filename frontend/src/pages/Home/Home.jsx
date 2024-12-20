import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      
      <ExploreMenu category={category} setCategory={setCategory}/>
      <Header/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
