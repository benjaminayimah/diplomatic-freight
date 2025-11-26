
// 'use client'
import HomeBanner from '../components/sections/HomeBanner'
import HomeAbout from '../components/sections/HomeAbout'
import SpinBadge from '../components/SpinBadge'
import HomeCallNow from '../components/sections/HomeCallNow'
import HomeFAQs from '../components/sections/HomeFAQs'
import HomeTestimonials from '../components/sections/HomeTestimonials'
import HomeServices from '../components/sections/HomeServices'
import HomeGlobal from '../components/sections/HomeGlobal'
import HomeProcess from '../components/sections/HomeProcess'


export default function Home() {

  return (
    <>
      <HomeBanner />
      <HomeAbout />
      <HomeServices />
      <HomeGlobal />
      <HomeProcess />
      <HomeTestimonials />
      <HomeFAQs />
      <HomeCallNow />
      <SpinBadge />
    </>      
  );
}
