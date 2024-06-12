import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthoProvider from '@/components/AuthProvider'

export const metadata = {
  title: 'PropertPulse | Find The Perfect Rental',
  description: 'Find your dream rental  property',
  keywords: 'rental, find rentals, find properties'
}

const MainLayout = ({ children }) => {
  return (
    <AuthoProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthoProvider>
  );
}

export default MainLayout