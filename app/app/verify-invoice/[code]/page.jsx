'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import useFetchData from "@/hooks/useFetchData";
import Loader from '../../../components/Loader';


import VerifySuccess from '../../../components/dashboard/VerifySuccess'
import VerifyFailed from '../../../components/dashboard/VerifyFailed'


function VerifyPage() {

  const params = useParams();
  const { code } = params;

  const { data: dataObj, loading, error } = useFetchData(`/invoice/verify/${code}`);

  if(loading)
    return <div className='h-dvh w-full flex flex-col items-center justify-center gap-5 verifiable'><Loader size={60} /><span>Verifying, please wait...</span></div>;
  if(!dataObj.success)
    return <VerifyFailed />;
  return <VerifySuccess invoice={dataObj.data} />
}

export default VerifyPage