'use client';

import GoogleAnalytics from './GoogleAnalytics';
import { useEffect, useState } from 'react';

function ClientAnalyticsWrapper() {
  const [userAcceptedCookies, setUserAcceptedCookies] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieAccepted');
    setUserAcceptedCookies(consent === 'true');
  }, []);

  return <GoogleAnalytics userAcceptedCookies={userAcceptedCookies} />;
}

export default ClientAnalyticsWrapper;
