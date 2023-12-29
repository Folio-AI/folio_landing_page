'use client'

import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

import Sidebar from '@/components/dashboard/sidebar/Sidebar'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  

  return (
    <>

      <Layout>
        <main className="grow">
            {children}
        </main>
      </Layout>

      {/* <Footer />  */}
    </>
  )
  
}
