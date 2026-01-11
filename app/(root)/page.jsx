

import HomeBanner from '../components/sections/HomeBanner'
import HomeAbout from '../components/sections/HomeAbout'
import SpinBadge from '../components/SpinBadge'
import HomeCallNow from '../components/sections/HomeCallNow'
import HomeFAQs from '../components/sections/HomeFAQs'
import HomeTestimonials from '../components/sections/HomeTestimonials'
import HomeServices from '../components/sections/HomeServices'
import HomeGlobal from '../components/sections/HomeGlobal'
import HomeProcess from '../components/sections/HomeProcess'
import HomeGallery from '../components/sections/HomeGallery'  
import HomeWhyChoose from '../components/sections/HomeWhyChoose'


export default function Home() {

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What logistics services do you offer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We offer air freight, sea freight, customs clearance, warehousing, cargo handling, and end-to-end logistics solutions."
                }
              },
              {
                "@type": "Question",
                name: "Do you handle international shipments?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we provide international shipping services across Africa and worldwide."
                }
              },
              {
                "@type": "Question",
                name: "How can I request a quote?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can request a quote by visiting our Get a Quote page or contacting us directly via phone or email."
                }
              }
            ]
          }),
        }}
      />
      <HomeBanner />
      <HomeAbout />
      <HomeWhyChoose />
      <HomeServices />
      <HomeGlobal />
      <HomeProcess />
      <HomeTestimonials />
      <HomeGallery />
      <HomeFAQs />
      <HomeCallNow />
      <SpinBadge />
    </>      
  );
}
