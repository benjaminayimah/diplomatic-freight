import React from 'react'

function Table({
  data
}) {

  const CURRENCY = data?.currency || 'USD';

  const VAT = data?.vat || 0;
  
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

  return (
    <>
      <div>
        <div className="overflow-x-auto pt-6">
          <table className="w-full text-left text-sm">
            <thead className="bg-blue-500 text-white uppercase tracking-wider">
              <tr>
                <th className="w-[55%] px-4 py-3 font-bold text-xs text-left">Item Description</th>
                <th className="w-[12%] px-4 py-3 font-bold text-xs text-center">Quantity</th>
                <th className="w-[15%] px-4 py-3 font-bold text-xs text-right">Price</th>
                {/* <th className="px-4 py-3 font-bold text-xs">Extra</th> */}
                <th className="w-[18%] px-4 py-3 font-bold text-xs text-right">Amount</th>
              </tr>
            </thead>
            <tbody className=" text-neutral-800">
              {/* <!-- Items begins here--> */}

              {Array.isArray(data?.items) && data.items.length > 0 ? (
                data.items.map((item, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="p-4 align-top text-left">{item?.description || 'N/A'}</td>
                    <td className="p-4 align-top text-center">{item?.quantity}</td>
                    <td className="p-4 align-top text-right">{Number(item?.rate || 0).toLocaleString("en-US", { style: "currency", currency: CURRENCY })}</td>
                    {/* <td className="p-4 align-top">{Number(item?.extra_charges || 0).toLocaleString("en-US",{ style: "currency", currency: CURRENCY})}</td> */}
                    <td className="p-4 align-top text-right font-medium">
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
        <div className="w-full sm:max-w-md space-y-4 text-neutral-800 grid">
          <div className="justify-between grid grid-cols-2">
            <span className='font-medium'>Subtotal</span>
            <span className='font-medium text-right'>
              {getInvoiceTotals(data?.items)?.subtotalFormatted}
            </span>
          </div>
          {
            VAT > 0 && (
            <div className="justify-between grid grid-cols-2">
              <span className='font-medium'>VAT ({VAT}%)</span>
              <span className='font-medium text-right'>{getInvoiceTotals(data?.items).vatFormatted}</span>
            </div>
            )
          }
          <div className="flex justify-between border-t text-xl pt-4 border-gray-200  text-black font-bold">
            <span>Total Amount Due</span>
            <span>
              {getInvoiceTotals(data?.items).totalFormatted}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table