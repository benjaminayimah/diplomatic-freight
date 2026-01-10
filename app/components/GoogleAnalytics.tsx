'use client';

import Script from 'next/script';
import { useEffect } from 'react';

type AnalyticsProps = {
  userAcceptedCookies: boolean;
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function Analytics({ userAcceptedCookies }: AnalyticsProps) {
  const analyticsEnabled =
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

  if (!analyticsEnabled || !GA_MEASUREMENT_ID) {
    return null;
  }

  useEffect(() => {
    if (userAcceptedCookies && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
      });
    }
  }, [userAcceptedCookies]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
        `}
      </Script>
    </>
  );
}
