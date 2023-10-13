export const metadata = {
  title: 'Pricing | Folio AI',
  description: 'Folio AI.',
}

import PricingTables from '@/components/pricing-tables'
import FeaturesTable from '@/components/features-table'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Faqs from '@/components/faqs'
import Cta from '@/components/cta'

export default function Pricing() {
  return (
    <>
      <PricingTables />
      {/* <FeaturesTable />
      <TestimonialsCarousel />
      <Faqs /> */}
      <Cta />
    </>
  )
}
