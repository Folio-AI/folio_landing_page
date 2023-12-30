'use client'

import { Layout } from '@/components/layout/layout';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

import Loading from '@/components/utils/loading';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {  
  // const router = useRouter();
  // Redirect page to home if not authenticaated on the server side
  const { data : session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/');
    }
  });

  if (status == 'loading') {
    return <Loading />
  }

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


