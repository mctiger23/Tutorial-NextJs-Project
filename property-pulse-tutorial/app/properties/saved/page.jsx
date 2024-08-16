import React from 'react'
import PropertyCard from '@/components/PropertyCard'
import User from '@/models/Users'
import connectDB from '@/config/database'
import { getSessionUser } from '@/utils/getSessionUser'

export const SavedPropertiesPage = async () => {

    const {userId} = await getSessionUser()

    const {bookmarks}= await User.findById(userId).populate('bookmarks')

    return (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h1 className="text-2xl mb-4">Saved Properties</h1>
          {bookmarks.length === 0 ? (
            <p>No Saved Properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bookmarks.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
}

export default SavedPropertiesPage