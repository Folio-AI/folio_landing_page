'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'

import { NavbarWrapper } from '@/components/navbar/navbar';

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
        <NavbarWrapper>
            <main className="grow">
                {children}
            </main>
        </NavbarWrapper>
      {/* <Footer />  */}
    </>
  )  
}


