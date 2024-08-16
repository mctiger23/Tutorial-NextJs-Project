'use client'
import React, {useEffect, useState} from 'react'
import { setDefaults, fromAddress } from 'react-geocode'
import Map, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import Spinner from './Spinner'

export const PropertyMap = ({property}) => {
   const [lat, setLat] = useState(null)
   const [lng, setLng] = useState(null) 
   const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitute: 0,
    zoom: 12,
    width: '100%', 
    height: '500px',

   })
   const [loading,setLoading] = useState(true)
   const [geocodeError, setGeocodeError] = useState(false)

   setDefaults({
     key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
     language: 'en',
     region: 'US'
   });

   useEffect(()=>{
    const fecthCoords =async() =>{
        try {
            const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state}${property.location.zipcode}`)

            //check geocode results
            if(res.results.length ===0){
                setGeocodeError(true)
                return; 
            }

            const {lat,lng}= res.results[0].geometry.location
            setLat(lat)
            setLng(lng)
            setViewPort({
                ...viewPort,
                latitude: lat,
                longitute: lng
            })
        } catch (error) {
            console.log(error)
            setGeocodeError(true)
        } finally {
            setLoading(false)
        }
    }
    fecthCoords()
   },[])

   if(loading) return <Spinner/>
   if(geocodeError) return <div className='text-xl'>No Location Data Found</div>

   return (
     <Map
       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
       mapLib={import("mapbox-gl")}
       initialViewState={{
         longitude: lng,
         latitude: lat,
         zoom: 15,
       }}
       style={{ width: "100%", height: 500 }}
       mapStyle="mapbox://styles/mapbox/streets-v12"
     >
       <Marker longitude={lng} latitude={lat} anchor="bottom">
         <Image src={pin} alt="location" width={40} height={40} />
       </Marker>
     </Map>
   );
}


export default PropertyMap