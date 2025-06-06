import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {

  const [category,setCategory]=useState('All')

  return (
    <div>
        <Header />
        {/* pass the above category  state in ExploreMenu component as a prop, which is destructured in the ExploreMenu component */}
        <ExploreMenu category={category} setCategory={setCategory} />
        {/* pass category state as a prop */}
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  )
}

export default Home