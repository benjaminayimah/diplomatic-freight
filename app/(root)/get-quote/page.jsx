

import GetQuoteClient from "../../components/GetQuoteClient";

export const metadata = {
  title: 'Get a Quote - Diplomatic Freight & Logistics Services Ltd.',
  description:
    'Request a fast logistics quote for air freight, sea freight, and customs clearance services tailored to your shipment needs.',
};

function GetQuote() {
  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://www.diplomaticfreight.com"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Get a Quote",
                  item: "https://www.diplomaticfreight.com/get-quote"
                },
              ]
            }),
          }}
        />
      <GetQuoteClient />
    </>
    
  ) 
}

export default GetQuote