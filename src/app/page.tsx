import { getSettings, getCookies, getBoxes } from '@/lib/data'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import HowItWorks from '@/components/HowItWorks'
import Flavors from '@/components/Flavors'
import Boxes from '@/components/Boxes'
import Corporate from '@/components/Corporate'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

// Render dinámico para reflejar de inmediato los cambios del panel /admin
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [settings, cookies, boxes] = await Promise.all([getSettings(), getCookies(), getBoxes()])

  const heroImages = Array.from(
    new Set([
      settings.heroImage,
      '/images/cookies-tin.jpg',
      '/images/cookies-basket.jpg',
      '/images/flavor-chocolate.jpg',
    ])
  )

  return (
    <main>
      <Navbar settings={settings} />
      <Hero settings={settings} images={heroImages} />
      <Marquee />
      <About settings={settings} />
      <HowItWorks />
      <Flavors cookies={cookies} settings={settings} />
      <Boxes settings={settings} boxes={boxes} />
      <Corporate settings={settings} />
      <Testimonials />
      <FAQ />
      <Contact settings={settings} />
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
    </main>
  )
}
