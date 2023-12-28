'use client'

import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  

  return (
    <>
      
      <main className="grow">
          {children}
      </main>

      <Footer />
    </>
  )
}
