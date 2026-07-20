import React from 'react'

function Disclaimer() {
  return (
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
  )
}

export default Disclaimer