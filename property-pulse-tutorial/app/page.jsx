import React from 'react'
import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'

const HomePage = async () => {

  return (
    <div>
      <Hero></Hero>
      <InfoBoxes></InfoBoxes>
      <HomeProperties></HomeProperties>
    </div>
  )
}

export default HomePage