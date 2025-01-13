import React, { useState } from 'react'
import './Customer.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
// import AppDownload from '../../components/AppDownload/AppDownload'

const Customer = () => {
  const [category, setCategory] = useState("All");
  return (
    <div> 
      <ExploreMenu category={category} setCategory={setCategory}/>
      {/* <Header/> */}
      <FoodDisplay category={category}/>
      {/* <AppDownload/> */}
    </div>
  )
}

export default Customer
