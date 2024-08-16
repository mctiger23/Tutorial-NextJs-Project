import React from 'react'
import Link from 'next/link';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import { convertToSerializeObject } from '@/utils/convertToObject';
import PropertyCard from '@/components/PropertyCard';
import { PropertySearchForm } from '@/components/PropertySearchForm';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

export const SearchResultPage = async ({searchParams: {location, propertyType}}) => {
    await connectDB()

    const locationPattern = new RegExp(location,'i'); 
    let query = {
        $or: [
            { name: locationPattern},
            { description: locationPattern},
            { 'location.street': locationPattern},
            { 'location.city': locationPattern},
            { 'location.zipcode': locationPattern},
            { 'location.state': locationPattern}
        ]
    }

    if(propertyType && propertyType !=='All'){
        const typePattern = new RegExp(propertyType,'i')
        query.type = typePattern
    }

    const propertiesQueryResults = await Property.find(query).lean();
    const properties = convertToSerializeObject(propertiesQueryResults)
    
  return (
    <>
    {/* Search from */}
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col item-start sm:px-6 lg:px-8">
          <PropertySearchForm/>
        </div>
      </section>
      {/* Back to Properties */}
      <section className="container-xl lg:container m-auto px-4 py-6">
        <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
          <FaArrowAltCircleLeft className='mr-2 mb-1'/> Back To Properties
        </Link>
      </section>
    {/* Results */}
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h1 className="text-2xl mb4">Search Results</h1>
          {properties.lenght === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}


export default SearchResultPage;