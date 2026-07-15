import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { useFormatter } from '@/hooks/useFormatter'
import { generateWalletQR } from "@/utils/crypto/walletQR";


function InvoiceTemplate({ profile, invoice, printRef, qrData }) {

  const payments = invoice.payments



  const CURRENCY = invoice.currency || 'USD';

  const VAT = invoice?.vat || 0;
  
  const vat = Number(VAT) / 100 || 0;

  const getInvoiceTotals = (items, vatRate = vat) => {
    const subtotal = items?.reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const vat = subtotal * vatRate;
    const total = subtotal + vat;

    return {
      subtotalFormatted: subtotal?.toLocaleString("en-US", { style: "currency", currency: CURRENCY }),
      vatFormatted: vat.toLocaleString("en-US", { style: "currency", currency: CURRENCY }),
      totalFormatted: total.toLocaleString("en-US", { style: "currency", currency: CURRENCY }),
    };
  };

  const { dateFormat } = useFormatter()

  return (
    <div className='px-4 py-4 md:py-12 bg-gray-50 rounded-xl border border-gray-100 flex justify-center flex-1'>
      <div className='shadow-sm rounded-xl overflow-hidden max-w-225 w-full'>
        <article ref={printRef} className='bg-white relative'>
          <div id='watermark' className='absolute z-0 top-120 left-[50%] -translate-x-1/2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="263.043" height="220.635" viewBox="0 0 263.043 220.635">
              <path d="M-2519.777,1211.078c-58.223-5.076-60.063-44.121-56.655-61.254,2.272,12.422,15.218,36.26,42.6,39.836,66.034,8.622,140.165-57.828,162.318-79.674,0,0-5.922-6.25-10.239-10.28s-11.914-10.281-11.914-10.281l79.242-11.994-19.611,79.246s-4.051-7.31-6.818-11.566-6.8-9.852-6.8-9.852c-28.078,29.839-90.509,76.379-159.211,76.377Q-2513.284,1211.636-2519.777,1211.078Zm-11.825-38.454c-11.642-1.521-19.507-8.98-23.9-16.121a118.226,118.226,0,0,1-9.618-46.866A118.637,118.637,0,0,1-2446.479,991a118.673,118.673,0,0,1,109.331,72.493l-17.633,2.67a101.615,101.615,0,0,0-72.183-56.109,176.975,176.975,0,0,1,28.463,62.726l-17.046,2.579a159.763,159.763,0,0,0-30.932-62.593,159.8,159.8,0,0,0-35.006,88.282h70.012q-.165-2.182-.391-4.355l7.29,6h0l.013.01.056.047.231.19.878.729c.75.624,1.8,1.5,2.968,2.492,1.343,1.138,2.777,2.372,4.1,3.536-4.541,4.057-9.777,8.542-15.572,13.2q.245-2.33.423-4.669h-70.012a159.781,159.781,0,0,0,9.283,42.837,167.183,167.183,0,0,1-16.006,6.245,176.925,176.925,0,0,1-10.5-49.082h-48.871a100.979,100.979,0,0,0,21.98,54.925C-2527.618,1173.056-2529.62,1172.884-2531.6,1172.625Zm-15.977-71.575h48.871a176.949,176.949,0,0,1,32.716-90.994A101.515,101.515,0,0,0-2547.579,1101.049Z" transform="translate(2577.465 -991.001)" fill="rgba(57,108,240,0.04)"/>
            </svg>
          </div>
          <main className="p-6 sm:p-10 min-h-280 z-10 relative">
            {/* <!-- Invoice Header --> */}
            <div className="invoice-section flex flex-wrap justify-between gap-6 pb-5">
              <div className="flex flex-col">
                <p className=" text-black text-4xl font-black leading-tight tracking-[-0.033em]">
                  <svg id="logo" xmlns="http://www.w3.org/2000/svg" height="45" viewBox="0 0 316.469 67">
                    <g id="icon" transform="translate(-2)">
                      <path d="M39.776,0a36.036,36.036,0,0,1,33.2,22.014l-5.354.811A30.858,30.858,0,0,0,45.7,5.786a53.743,53.743,0,0,1,8.643,19.048l-5.176.783A48.518,48.518,0,0,0,39.776,6.61a48.522,48.522,0,0,0-10.63,26.808h21.26q-.05-.663-.119-1.323L52.5,33.916h0l0,0,.017.014.07.058.267.221c.228.19.545.455.9.757.408.346.843.72,1.246,1.074-1.379,1.232-2.969,2.594-4.729,4.009q.075-.707.129-1.418H29.146a48.511,48.511,0,0,0,2.819,13.008,50.793,50.793,0,0,1-4.861,1.9,53.728,53.728,0,0,1-3.188-14.9H9.076A30.662,30.662,0,0,0,15.75,55.314q-.92-.044-1.823-.161a10.1,10.1,0,0,1-7.256-4.9A36.045,36.045,0,0,1,39.776,0ZM33.85,5.786A30.827,30.827,0,0,0,9.076,33.418h14.84A53.739,53.739,0,0,1,33.85,5.786Z" fill="#000"/>
                      <path d="M13.251,60.326C4.935,59.241,1,52,.314,48.229c-1.035,5.2-.476,17.06,17.2,18.6,22.379,1.951,43.21-13.4,52.268-23.024,0,0,1.226,1.7,2.066,2.992s2.07,3.512,2.07,3.512l5.955-24.064L55.814,29.888s2.307,1.9,3.618,3.122,3.109,3.122,3.109,3.122C55.814,42.766,33.3,62.945,13.251,60.326Z" fill="#0077FF"/>
                    </g>
                    <path id="name" d="M221.29,52.8a4.367,4.367,0,0,1-1.464-1.068,4.1,4.1,0,0,1-.863-1.507l1.244-.512a3.458,3.458,0,0,0,1.171,1.624,3.121,3.121,0,0,0,1.844.556,2.869,2.869,0,0,0,1.127-.2,1.721,1.721,0,0,0,.746-.571,1.609,1.609,0,0,0-.117-1.961,2.352,2.352,0,0,0-1.127-.615l-2-.615a3.6,3.6,0,0,1-1.815-1.156,2.83,2.83,0,0,1-.629-1.815,2.872,2.872,0,0,1,.424-1.566,2.963,2.963,0,0,1,1.2-1.068,3.812,3.812,0,0,1,1.756-.4,4.314,4.314,0,0,1,1.771.351,4.023,4.023,0,0,1,1.361.951,3.687,3.687,0,0,1,.82,1.347l-1.229.512a2.812,2.812,0,0,0-1.054-1.39,2.849,2.849,0,0,0-1.654-.483,2.494,2.494,0,0,0-1.039.2,1.519,1.519,0,0,0-.688.571,1.591,1.591,0,0,0-.234.878,1.646,1.646,0,0,0,.38,1.068,2.376,2.376,0,0,0,1.156.717l1.829.542a4.214,4.214,0,0,1,1.946,1.127,2.612,2.612,0,0,1,.659,1.815,2.744,2.744,0,0,1-.468,1.581,3.1,3.1,0,0,1-1.273,1.083,4.338,4.338,0,0,1-1.873.38A4.662,4.662,0,0,1,221.29,52.8Zm-19.241-.029a5.284,5.284,0,0,1-1.7-1.185A5.416,5.416,0,0,1,199.24,49.8a6.584,6.584,0,0,1,0-4.493,5.412,5.412,0,0,1,1.112-1.785,4.906,4.906,0,0,1,1.7-1.171,5.323,5.323,0,0,1,2.137-.424,4.939,4.939,0,0,1,2.019.4,4.744,4.744,0,0,1,1.522,1.024,3.725,3.725,0,0,1,.893,1.346l-1.317.6a3.282,3.282,0,0,0-3.117-2.034,3.848,3.848,0,0,0-2.034.541,3.742,3.742,0,0,0-1.376,1.507,5.32,5.32,0,0,0,0,4.493,3.742,3.742,0,0,0,1.376,1.507,3.848,3.848,0,0,0,2.034.542,3.314,3.314,0,0,0,1.932-.556,3.379,3.379,0,0,0,1.185-1.478l1.317.6a3.725,3.725,0,0,1-.893,1.346,4.744,4.744,0,0,1-1.522,1.024,4.939,4.939,0,0,1-2.019.4A5.491,5.491,0,0,1,202.049,52.775Zm-42.341.029a4.374,4.374,0,0,1-1.464-1.068,4.1,4.1,0,0,1-.863-1.507l1.244-.512a3.461,3.461,0,0,0,1.171,1.624,3.121,3.121,0,0,0,1.844.556,2.868,2.868,0,0,0,1.127-.2,1.721,1.721,0,0,0,.746-.571,1.448,1.448,0,0,0,.278-.878,1.464,1.464,0,0,0-.4-1.083,2.35,2.35,0,0,0-1.127-.615l-2-.615a3.6,3.6,0,0,1-1.815-1.156,2.833,2.833,0,0,1-.629-1.815,2.875,2.875,0,0,1,.424-1.566,2.967,2.967,0,0,1,1.2-1.068,3.814,3.814,0,0,1,1.756-.4,4.313,4.313,0,0,1,1.771.351,4.021,4.021,0,0,1,1.361.951,3.686,3.686,0,0,1,.82,1.347l-1.229.512a2.812,2.812,0,0,0-1.054-1.39,2.847,2.847,0,0,0-1.654-.483,2.5,2.5,0,0,0-1.039.2,1.521,1.521,0,0,0-.688.571,1.594,1.594,0,0,0-.234.878,1.648,1.648,0,0,0,.38,1.068,2.379,2.379,0,0,0,1.156.717l1.829.542a4.213,4.213,0,0,1,1.946,1.127,2.612,2.612,0,0,1,.659,1.815,2.741,2.741,0,0,1-.468,1.581,3.092,3.092,0,0,1-1.273,1.083,4.336,4.336,0,0,1-1.873.38A4.666,4.666,0,0,1,159.709,52.8Zm-11.99,0a4.361,4.361,0,0,1-1.464-1.068,4.1,4.1,0,0,1-.864-1.507l1.244-.512a3.459,3.459,0,0,0,1.171,1.624,3.12,3.12,0,0,0,1.844.556,2.871,2.871,0,0,0,1.127-.2,1.723,1.723,0,0,0,.746-.571,1.609,1.609,0,0,0-.117-1.961,2.351,2.351,0,0,0-1.127-.615l-2-.615a3.594,3.594,0,0,1-1.815-1.156,2.83,2.83,0,0,1-.629-1.815,2.872,2.872,0,0,1,.424-1.566,2.963,2.963,0,0,1,1.2-1.068,3.811,3.811,0,0,1,1.756-.4,4.313,4.313,0,0,1,1.771.351,4.024,4.024,0,0,1,1.361.951,3.686,3.686,0,0,1,.819,1.347l-1.229.512a2.814,2.814,0,0,0-1.054-1.39,2.848,2.848,0,0,0-1.654-.483,2.5,2.5,0,0,0-1.039.2,1.521,1.521,0,0,0-.688.571,1.594,1.594,0,0,0-.234.878,1.647,1.647,0,0,0,.381,1.068,2.376,2.376,0,0,0,1.156.717l1.829.542a4.218,4.218,0,0,1,1.946,1.127,2.612,2.612,0,0,1,.659,1.815,2.744,2.744,0,0,1-.468,1.581,3.1,3.1,0,0,1-1.273,1.083,4.339,4.339,0,0,1-1.873.38A4.662,4.662,0,0,1,147.719,52.8Zm-10.366-.029a5.282,5.282,0,0,1-1.7-1.185,5.422,5.422,0,0,1-1.112-1.785,6.584,6.584,0,0,1,0-4.493,5.417,5.417,0,0,1,1.112-1.785,4.9,4.9,0,0,1,1.7-1.171,5.32,5.32,0,0,1,2.137-.424,4.941,4.941,0,0,1,2.02.4,4.742,4.742,0,0,1,1.522,1.024,3.721,3.721,0,0,1,.893,1.346l-1.317.6a3.286,3.286,0,0,0-1.185-1.464,3.253,3.253,0,0,0-1.932-.571,3.846,3.846,0,0,0-2.034.541,3.743,3.743,0,0,0-1.376,1.507,5.323,5.323,0,0,0,0,4.493,3.743,3.743,0,0,0,1.376,1.507,3.846,3.846,0,0,0,2.034.542,3.313,3.313,0,0,0,1.932-.556,3.379,3.379,0,0,0,1.185-1.478l1.317.6a3.721,3.721,0,0,1-.893,1.346,4.742,4.742,0,0,1-1.522,1.024,4.941,4.941,0,0,1-2.02.4A5.488,5.488,0,0,1,137.353,52.775Zm-22,.029a4.371,4.371,0,0,1-1.464-1.068,4.1,4.1,0,0,1-.863-1.507l1.244-.512a3.458,3.458,0,0,0,1.171,1.624,3.121,3.121,0,0,0,1.844.556,2.868,2.868,0,0,0,1.127-.2,1.721,1.721,0,0,0,.746-.571,1.609,1.609,0,0,0-.117-1.961,2.351,2.351,0,0,0-1.127-.615l-2-.615a3.6,3.6,0,0,1-1.815-1.156,2.833,2.833,0,0,1-.629-1.815,2.872,2.872,0,0,1,.424-1.566,2.967,2.967,0,0,1,1.2-1.068,3.814,3.814,0,0,1,1.756-.4,4.314,4.314,0,0,1,1.771.351,4.027,4.027,0,0,1,1.361.951,3.686,3.686,0,0,1,.819,1.347l-1.229.512a2.812,2.812,0,0,0-1.054-1.39,2.847,2.847,0,0,0-1.654-.483,2.5,2.5,0,0,0-1.039.2,1.521,1.521,0,0,0-.688.571,1.594,1.594,0,0,0-.234.878,1.646,1.646,0,0,0,.38,1.068,2.378,2.378,0,0,0,1.156.717l1.829.542a4.215,4.215,0,0,1,1.946,1.127,2.612,2.612,0,0,1,.659,1.815,2.742,2.742,0,0,1-.468,1.581,3.092,3.092,0,0,1-1.273,1.083,4.337,4.337,0,0,1-1.873.38A4.664,4.664,0,0,1,115.348,52.8Zm-14.767-.029a5.076,5.076,0,0,1-1.7-1.185A5.61,5.61,0,0,1,97.757,49.8a6.583,6.583,0,0,1,0-4.493,5.406,5.406,0,0,1,1.112-1.785,4.9,4.9,0,0,1,1.7-1.171,5.318,5.318,0,0,1,2.137-.424,4.94,4.94,0,0,1,2.019.4,4.744,4.744,0,0,1,1.522,1.024,3.729,3.729,0,0,1,.893,1.346l-1.288.629a3.253,3.253,0,0,0-1.185-1.507,3.363,3.363,0,0,0-1.961-.556,3.845,3.845,0,0,0-2.034.541,3.741,3.741,0,0,0-1.376,1.507,5.32,5.32,0,0,0,0,4.493,3.724,3.724,0,0,0,3.424,2.049,3.8,3.8,0,0,0,1.8-.424,3.28,3.28,0,0,0,1.273-1.171,3.183,3.183,0,0,0,.468-1.727v-.059H102.7V47.229h5v.966a5.187,5.187,0,0,1-.4,2.063,4.759,4.759,0,0,1-1.083,1.581,4.9,4.9,0,0,1-1.6,1,5.263,5.263,0,0,1-1.917.351A5.487,5.487,0,0,1,100.582,52.775Zm-12.7,0a5.486,5.486,0,0,1-1.771-1.185A5.558,5.558,0,0,1,84.939,49.8a5.9,5.9,0,0,1-.424-2.254,5.829,5.829,0,0,1,.424-2.253,5.555,5.555,0,0,1,1.171-1.785,5.325,5.325,0,0,1,1.756-1.171,5.745,5.745,0,0,1,2.181-.41,5.464,5.464,0,0,1,2.166.424,5.134,5.134,0,0,1,1.756,1.171A5.279,5.279,0,0,1,95.153,45.3a5.656,5.656,0,0,1,.439,2.253,5.727,5.727,0,0,1-.439,2.254,5.447,5.447,0,0,1-1.185,1.785,5.318,5.318,0,0,1-1.756,1.185,5.638,5.638,0,0,1-2.166.41A5.708,5.708,0,0,1,87.88,52.775Zm.527-9.176a3.818,3.818,0,0,0-1.3.922,4.322,4.322,0,0,0-.849,1.361,4.487,4.487,0,0,0-.307,1.668,4.6,4.6,0,0,0,.307,1.683,4.5,4.5,0,0,0,.849,1.376,4.2,4.2,0,0,0,4.6.922,3.938,3.938,0,0,0,1.288-.922,4.164,4.164,0,0,0,.849-1.376,4.6,4.6,0,0,0,.307-1.683,4.487,4.487,0,0,0-.307-1.668,4.006,4.006,0,0,0-.849-1.361A3.676,3.676,0,0,0,91.7,43.6a4.2,4.2,0,0,0-3.293,0Zm-23.45,9.249a2.585,2.585,0,0,1-1.522-2.458,2.844,2.844,0,0,1,.263-1.259,3.537,3.537,0,0,1,.644-.951,5.239,5.239,0,0,1,.79-.659q.25-.17.446-.3-.208-.235-.416-.495a4.858,4.858,0,0,1-.6-.966,2.955,2.955,0,0,1-.234-1.185,2.543,2.543,0,0,1,.366-1.376,2.7,2.7,0,0,1,.995-.936,2.786,2.786,0,0,1,1.361-.337,2.674,2.674,0,0,1,1.332.337,2.608,2.608,0,0,1,.98,3.615,4.022,4.022,0,0,1-.878.98,9.477,9.477,0,0,1-.824.574L69.581,49.5l1.259-1.872h1.566L70.52,50.5l2.34,2.508h-1.8l-1.323-1.394a5.888,5.888,0,0,1-.652.662,4.029,4.029,0,0,1-1.068.659,3.7,3.7,0,0,1-1.42.249A3.81,3.81,0,0,1,64.957,52.848Zm.966-4.273a3.01,3.01,0,0,0-.7.747,1.784,1.784,0,0,0-.293,1.039A1.436,1.436,0,0,0,65.4,51.5a1.857,1.857,0,0,0,1.244.41,2.2,2.2,0,0,0,.863-.161,2.4,2.4,0,0,0,.673-.424,3.708,3.708,0,0,0,.541-.571l.087-.121-2.337-2.462Q66.206,48.353,65.923,48.575Zm.176-5.019a1.308,1.308,0,0,0-.381.966,1.718,1.718,0,0,0,.19.776,4.217,4.217,0,0,0,.468.732q.208.252.416.479.344-.21.667-.45a2.873,2.873,0,0,0,.659-.673,1.55,1.55,0,0,0,.263-.878,1.345,1.345,0,0,0-2.283-.951Zm-32.372,9.22a5.081,5.081,0,0,1-1.7-1.185A5.615,5.615,0,0,1,30.9,49.8a6.583,6.583,0,0,1,0-4.493,5.412,5.412,0,0,1,1.112-1.785,4.9,4.9,0,0,1,1.7-1.171,5.32,5.32,0,0,1,2.137-.424,4.94,4.94,0,0,1,2.02.4,4.747,4.747,0,0,1,1.522,1.024,3.733,3.733,0,0,1,.893,1.346L39,45.326a3.253,3.253,0,0,0-1.185-1.507,3.364,3.364,0,0,0-1.961-.556,3.847,3.847,0,0,0-2.034.541,3.742,3.742,0,0,0-1.376,1.507,5.32,5.32,0,0,0,0,4.493,3.724,3.724,0,0,0,3.424,2.049,3.8,3.8,0,0,0,1.8-.424,3.283,3.283,0,0,0,1.273-1.171,3.18,3.18,0,0,0,.468-1.727v-.059H35.849V47.229h5v.966a5.187,5.187,0,0,1-.4,2.063,4.749,4.749,0,0,1-1.083,1.581,4.892,4.892,0,0,1-1.595,1,5.265,5.265,0,0,1-1.917.351A5.488,5.488,0,0,1,33.727,52.775Zm176.844.234v-10.9h7.1v1.317h-5.663v3.454h5.371v1.317h-5.371v3.5h5.663v1.317Zm-15.263,0v-10.9h1.434v10.9Zm-6.878,0-3.937-10.9h1.537l3.183,9.144,3.183-9.144h1.537l-3.922,10.9Zm-6.039,0-2.35-4.171h-2.406v4.171H176.2v-10.9h3.849a4.2,4.2,0,0,1,1.9.41,3.017,3.017,0,0,1,1.273,1.171,3.334,3.334,0,0,1,.468,1.785,3.139,3.139,0,0,1-2.166,3.117l2.532,4.42Zm-4.756-5.488h2.459a2.428,2.428,0,0,0,1.127-.249,1.765,1.765,0,0,0,.747-.717,2.082,2.082,0,0,0,.278-1.083,2.033,2.033,0,0,0-.278-1.083,1.765,1.765,0,0,0-.747-.717,2.424,2.424,0,0,0-1.127-.249h-2.459Zm-10.309,5.488v-10.9h7.1v1.317H168.76v3.454h5.37v1.317h-5.37v3.5h5.663v1.317Zm-36.714,0v-10.9h1.434v10.9Zm-5.743,0V43.424h-2.956V42.107h7.317v1.317h-2.912v9.585Zm-15.222,0v-10.9h1.434v10.9Zm-32.356,0v-10.9h1.434v9.585H83.51v1.317Zm-21.835,0V43.424H52.5V42.107h7.317v1.317H56.9v9.585Zm-5.771,0V48.282H44.225v4.727H42.791v-10.9h1.434v4.858h5.459V42.107h1.449v10.9Zm-22.713,0v-10.9h1.434v10.9Zm-8.875,0v-10.9h7.1v1.317H19.53v3.454H24.9v1.317H19.53v3.5h5.663v1.317Zm-3.3,0-2.35-4.171H10.041v4.171H8.606v-10.9h3.849a4.2,4.2,0,0,1,1.9.41,3.02,3.02,0,0,1,1.273,1.171,3.337,3.337,0,0,1,.468,1.785,3.14,3.14,0,0,1-2.166,3.117l2.532,4.42Zm-4.756-5.488H12.5a2.43,2.43,0,0,0,1.127-.249,1.766,1.766,0,0,0,.746-.717,2.082,2.082,0,0,0,.278-1.083,2.033,2.033,0,0,0-.278-1.083,1.766,1.766,0,0,0-.746-.717,2.426,2.426,0,0,0-1.127-.249H10.041ZM.075,53.009v-10.9H6.982v1.317H1.509v3.527H6.47v1.317H1.509v4.742ZM208.521,28.79a14.237,14.237,0,0,1-4.63-3.151,14.776,14.776,0,0,1-3.113-4.746,15.884,15.884,0,0,1-1.089-5.953,15.883,15.883,0,0,1,1.089-5.953,13.989,13.989,0,0,1,7.7-7.859A14.912,14.912,0,0,1,214.318,0a14.392,14.392,0,0,1,5.641,1.05,13.043,13.043,0,0,1,4.28,2.8,10.171,10.171,0,0,1,2.49,3.891L221.4,10.31a7.37,7.37,0,0,0-7.081-4.863,8.387,8.387,0,0,0-4.513,1.206A8.241,8.241,0,0,0,206.771,10a10.923,10.923,0,0,0-1.05,4.941,11.171,11.171,0,0,0,1.05,4.98,8.24,8.24,0,0,0,3.035,3.346,8.387,8.387,0,0,0,4.513,1.206,7.281,7.281,0,0,0,4.474-1.362,7.366,7.366,0,0,0,2.607-3.5l5.33,2.568a10.171,10.171,0,0,1-2.49,3.891,13.038,13.038,0,0,1-4.28,2.8,14.392,14.392,0,0,1-5.641,1.05A14.805,14.805,0,0,1,208.521,28.79Zm-120.589,0a15.142,15.142,0,0,1-4.9-3.151A15.13,15.13,0,0,1,79.8,20.854a14.856,14.856,0,0,1-1.167-5.914,15.3,15.3,0,0,1,1.128-5.914A14.678,14.678,0,0,1,82.991,4.28a15.152,15.152,0,0,1,4.9-3.151,17.1,17.1,0,0,1,12.216,0,14.712,14.712,0,0,1,4.863,3.151A13.913,13.913,0,0,1,108.2,9.026a14.855,14.855,0,0,1,1.167,5.914,14.718,14.718,0,0,1-4.435,10.7,14.7,14.7,0,0,1-4.863,3.151,16.889,16.889,0,0,1-12.138,0ZM90.305,6.147a8.623,8.623,0,0,0-2.957,1.945,8.933,8.933,0,0,0-1.984,3.035,9.985,9.985,0,0,0-.7,3.813,10.284,10.284,0,0,0,.7,3.852,8.932,8.932,0,0,0,1.984,3.034,9.442,9.442,0,0,0,2.957,1.945,9.67,9.67,0,0,0,3.7.7,9.492,9.492,0,0,0,6.653-2.646,8.932,8.932,0,0,0,1.984-3.034,10.284,10.284,0,0,0,.7-3.852,9.984,9.984,0,0,0-.7-3.813,8.933,8.933,0,0,0-1.984-3.035,8.539,8.539,0,0,0-3-1.945A9.372,9.372,0,0,0,94,5.447,9.664,9.664,0,0,0,90.305,6.147Zm100.627,23.3V.467h6.03V29.452Zm-14.7,0V5.719h-7.353V.467H189.5V5.719h-7.237V29.452Zm-11.307,0-1.945-5.914H152.361l-1.945,5.914H143.88l9.8-28.985H161.7l9.8,28.985ZM154.034,18.286h7.275L157.688,7.1ZM136.406,29.452V10.774L127.652,22.06h-.778L118.12,10.367V29.452h-6.03V.467h5.836L127.4,13.03,136.6.467h5.836V29.452Zm-75.877,0V.467h6.03V24.2H78.814v5.252Zm-23.709,0V.467H47.946a12.592,12.592,0,0,1,5.291,1.05A8.265,8.265,0,0,1,56.895,4.63a9.254,9.254,0,0,1,1.323,5.1,8.908,8.908,0,0,1-1.362,5.019A8.516,8.516,0,0,1,53.2,17.9a12.492,12.492,0,0,1-5.252,1.05h-5.1v10.5Zm6.03-15.757h5.135a4.594,4.594,0,0,0,2.218-.506,3.567,3.567,0,0,0,1.439-1.4,3.888,3.888,0,0,0,.545-2.062,3.962,3.962,0,0,0-.545-2.1,3.565,3.565,0,0,0-1.439-1.4,4.59,4.59,0,0,0-2.218-.506H42.85ZM27.205,29.452V.467h6.03V29.452ZM0,29.452V.467H9.454a16.963,16.963,0,0,1,8.17,1.868A13.48,13.48,0,0,1,22.993,7.47,14.551,14.551,0,0,1,24.9,14.94a14.761,14.761,0,0,1-1.906,7.509,13.483,13.483,0,0,1-5.369,5.136,16.967,16.967,0,0,1-8.17,1.867ZM6.03,24.2H9.61a10.066,10.066,0,0,0,4.9-1.128A8.129,8.129,0,0,0,17.7,19.842a9.932,9.932,0,0,0,1.167-4.9,9.794,9.794,0,0,0-1.167-4.9,7.87,7.87,0,0,0-3.191-3.19,10.063,10.063,0,0,0-4.9-1.129H6.03Z" transform="translate(87.662 9.524)" fill="#000"/>
                  </svg>
                </p>
                <div className=" text-black text-sm mt-4">
                  <p className="font-bold">{profile?.company_name}</p>
                  <p>{profile?.address_line_1}</p>
                  <p>{profile?.address_line_2}</p>
                  <p>{profile?.address_line_3}</p>
                </div>
              </div>
              <div>
                <div className='text-4xl text-[#0077FF] flex md:justify-end'>
                  <p>INVOICE</p>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm w-full sm:w-auto mt-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Reference Number</p>
                    <p className=" text-neutral-800 font-medium">{invoice?.reference_number || 'SAMPLE-1234'}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Date of Departure</p>
                    <p className=" text-neutral-800 font-medium">
                      { invoice?.date_of_departure ? dateFormat(invoice.date_of_departure ) : "N/A" }
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Date of Issue</p>
                    <p className=" text-neutral-800 font-medium">
                      { invoice?.date_issue ? dateFormat(invoice.date_issue ) : "N/A" }
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500">Date Due</p>
                    <p className=" text-neutral-800 font-medium">
                      { invoice?.date_due ? dateFormat(invoice.date_due ) : "N/A" }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='border border-gray-100 p-5 rounded-xl'>
            </div> */}
            {/* <!-- Bill To Section border-t-2 border-[#0A47C9]--> */}
            <div className="invoice-section">
              <h2 className=" text-black text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">Bill To:</h2>
              <div className="p-4 bg-white border border-gray-200  rounded-lg flex justify-between items-center">
                <div className="text-neutral-800 text-base font-normal leading-normal grid">
                  <div className="inline-flex gap-1.5 text-black"><span className="font-bold">{invoice?.name || 'N/A'}</span></div>
                  { invoice?.address && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">A: </span><span>{invoice.address}</span></div> }
                  { invoice?.email && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">E: </span><span>{invoice.email}</span></div> }
                  { invoice?.phone && <div className="inline-flex gap-1.5"><span className="font-bold flex text-black">P: </span><span>{invoice.phone}</span></div> }
                </div>
                <div className="flex gap-2 items-center flex-col shrink-0">
                  <QRCodeCanvas
                    value={qrData || 'https://example.com/verify-invoice'}
                    size={50}
                  />
                  <p className="text-xs text-gray-600">Scan to verify</p>
                </div>
              </div>
            </div>
            {/* <!-- Itemized Services Table --> */}
            <div>
              <div className="overflow-x-auto pt-8">
                <table className="w-full text-left text-sm">
                  <thead className="bg-blue-500 border text-white uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-2 font-bold text-xs">Item Description</th>
                      <th className="px-4 py-2 font-bold text-xs">Quantity</th>
                      <th className="px-4 py-2 font-bold text-xs">Rate</th>
                      <th className="px-4 py-2 font-bold text-xs">Extra</th>
                      <th className="px-4 py-2 font-bold text-right text-xs">Amount</th>
                    </tr>
                  </thead>
                  <tbody className=" text-neutral-800">
                    {/* <!-- Items begins here--> */}

                    {Array.isArray(invoice?.items) && invoice.items.length > 0 ? (
                      invoice.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-200">
                          <td className="p-4">{item?.description || 'N/A'}</td>
                          <td className="p-4">{item?.quantity}</td>
                          <td className="p-4">{Number(item?.rate || 0).toLocaleString("en-US", { style: "currency", currency: CURRENCY })}</td>
                          <td className="p-4">{Number(item?.extra_charges || 0).toLocaleString("en-US",{ style: "currency", currency: CURRENCY})}</td>
                          <td className="p-4 text-right">
                            {Number(item?.amount || 0).toLocaleString("en-US",{ style: "currency", currency: CURRENCY})}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center p-4 text-gray-600">
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* <!-- Totals & Summary --> */}
            <div className="invoice-section flex pt-10 justify-end">
              <div className="w-full sm:max-w-sm space-y-4 text-neutral-800">
                <div className="flex justify-between">
                  <span className='font-semibold'>Subtotal</span>
                  <span className='font-medium'>
                    {getInvoiceTotals(invoice?.items)?.subtotalFormatted}
                  </span>
                </div>
                {
                  VAT > 0 && (
                  <div className="flex justify-between">
                    <span className='font-semibold'>VAT ({VAT}%)</span>
                    <span className='font-medium'>{getInvoiceTotals(invoice?.items).vatFormatted ?? 'Inclusive'}</span>
                  </div>
                  )
                }
                <div className="flex justify-between border-t pt-4 border-gray-200  text-black text-2xl font-bold">
                  <span>Total Amount Due</span>
                  <span>
                    {getInvoiceTotals(invoice?.items).totalFormatted}
                  </span>
                </div>
              </div>
            </div>
            {/* special note */}
            <div className="invoice-section pt-12 pb-6">
                { invoice?.note && 
                  <div className="p-4 bg-white border border-black flex justify-between items-center">
                    <div className="text-sm text-black">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: invoice?.note,
                        }}
                      />
                    </div>
                  </div>
                }
            </div>
            {/* <!-- Payment Information --> */}
            <div className="grid grid-cols-1 gap-6">
            { payments && payments.length > 0 &&
              <div className="invoice-section pt-12 pb-6">
                <div className="mb-4">
                  <h3 className="font-bold text-black mb-1">Payment Account{payments.length > 1 && 's' }</h3>
                  <p className="text-black text-sm">Kindly make your payment to {payments.length > 1 && 'any of' } the following account{payments.length > 1 && 's' }:</p>
                </div>
                <div className='grid grid-cols-1 gap-8'>
                  {
                    payments?.map((payment) => (
                      payment.payment_method === 'bank_transfer' ? (
                        <li key={payment.id} className={`text-black text-sm space-y-1 ${payments.length > 1 ? 'list-decimal' : 'list-none'}`} >
                          <p><span className="font-medium"><strong>Payment Method:</strong></span> <span className='uppercase'>{payment?.payment_method.replace("_", " ") || 'N/A'}</span></p>
                          <p><span className="font-medium"><strong>Bank:</strong></span> {payment?.bank_name || 'N/A'}</p>
                          <p><span className="font-medium"><strong>Account Name:</strong></span> {payment?.account_name || 'N/A'}</p>
                          <p><span className="font-medium"><strong>Account Number:</strong></span> <code>{payment?.account_number || 'N/A'}</code></p>
                          <p><span className="font-medium"><strong>SWIFT/BIC:</strong></span> <code>{payment?.swift_code || 'N/A'}</code></p>
                          <p><span className="font-medium"><strong>Bank Branch:</strong></span> {payment?.bank_branch || 'N/A'}</p>
                        </li>
                      ) : (
                        <li key={payment.id} className={`text-black text-sm space-y-1 ${payments.length > 1 ? 'list-decimal' : 'list-none'}`} >
                          <p><span className="font-medium"><strong>Payment Method:</strong></span> <span className='uppercase'>{payment?.payment_method.replace("_", " ") || 'N/A'}</span></p>
                          <p><span className="font-medium"><strong>Wallet Address:</strong></span> <code>{payment?.wallet_address || 'N/A'}</code></p>
                          <p><span className="font-medium"><strong>Network:</strong></span> <span className='uppercase'>{payment?.network || 'N/A'}</span></p>
                          <div className='mt-4'>
                            <div className="relative w-fit">
                              <QRCodeCanvas
                                value={generateWalletQR(
                                  payment?.network,
                                  payment?.wallet_address
                                )}
                                size={100}
                              />
                              <img
                                src="/usdt-logo.png"
                                alt="USDT"
                                className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                              />
                            </div>
                          </div>
                        </li>
                      )
                    ))
                  }
                </div>
              </div>
              }
              <div className='grid invoice-section pt-12 pb-6'>
                <h3 className="font-bold text-black">Payment Terms</h3>
                <p className="text-black text-sm mb-4">
                  <strong className="font-bold">Reservation:</strong>{" "}
                  Aircraft rate is reserved only from the issue date until the invoice due date. If payment is not received within this window, pricing and availability cannot be guaranteed.
                </p>
                {
                  invoice?.has_refund_policy && (
                    <p className="text-black text-sm">
                      <strong className="font-bold">Refund Policy:</strong>{" "}
                      All aircraft fees are non-refundable and non-transferable once the aircraft has been reserved or contracted. This policy applies under all circumstances, including but not limited to client cancellation, governmental or regulatory actions, weather conditions, operational constraints, force majeure, or third-party failures.
                    </p>
                  )
                }
              </div>
            </div>
          </main>

          {/* <!-- Footer --> */}
          <footer className="invoice-section grid grid-cols-1 p-6 sm:p-10 mt-auto text-gray-500 text-xs">
            <div className='mb-8'>
              <div className='mb-2'><strong>Disclaimer:</strong></div>
              <p className='mb-2'>
                This invoice is issued exclusively to the intended recipient named herein. It contains confidential and proprietary information belonging to the issuing party and is provided solely for the purpose stated.
              </p>
              <p className='mb-2'>
                Any duplication, reproduction, or distribution of this invoice, whether in full or in part, without prior written authorization from the issuer, is strictly prohibited. Unauthorized alteration, modification, or tampering with any details contained in this invoice is forbidden and shall render the document invalid.
              </p>
              <p className='mb-2'>
                The issuer shall not be liable for any losses, damages, claims, or disputes arising from:
              </p>
              <ul className='mb-2 pl-2'>
                <li>
                  • Unauthorized copies or duplicates of this invoice;
                </li>
                <li>
                  • Any form of alteration to the document;
                </li>
                <li>
                  • The use of this invoice by any party other than the intended recipient.
                </li>
              </ul>
              <p>
                Only the original version issued by the company is deemed valid. If you have received this invoice in error, please notify the sender immediately and destroy any copies.
              </p>
            </div>
            <div className="flex gap-2 items-center mt-6 mb-8 flex-col">
                <QRCodeCanvas
                  value={qrData || 'https://example.com/verify-invoice'}
                  size={100}
                />
              <p className="text-sm text-gray-600">Scan to verify</p>
            </div>
            <div className='text-center'>
              <p className="font-bold text-blue-500 text-base mb-2">Thank you for your business!</p>
              <p className='my-6 text-black'>For any enquiries regarding this invoice, please contact us using any of the details below.</p>
              <p className='flex flex-wrap gap-2 items-center justify-center'>
                { profile?.po_box }
                <span className='inline-block h-3 w-px border-r border-gray-400' />
                { profile?.phone }
                <span className='inline-block h-3 w-px border-r border-gray-400' />
                { profile?.mobile }
                <span className='inline-block h-3 w-px border-r border-gray-400' />
                { profile?.email }
                <span className='inline-block h-3 w-px border-r border-gray-400' />
                { profile?.website }
                <span className='inline-block h-3 w-px border-r border-gray-400' />
                { profile?.company_name + ' All rights reserved.' }
              </p>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

export default InvoiceTemplate