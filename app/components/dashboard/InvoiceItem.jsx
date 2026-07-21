'use client'

import React, { useState } from 'react'
import Input from '../Input';
import { TrashIcon } from "@heroicons/react/24/outline";


function InvoiceItem({ data, index, onChange, onRemove, currency }) {

  const CURRENCY = currency || 'USD';

  return (
    <div className='flex flex-col md:flex-row gap-3 pb-4 border-b border-gray-100 invoice-item-row'>
      <Input
        label="Description"
        id={`description_${index}`}
        type="text"
        placeholder="Description"
        value={data.description}
        onChange={(e) => onChange(index, 'description', e.target.value)}
        errors={[]}
        required
      />
      <Input
        label="Quantity"
        id={`quantiy${index}`}
        type="number"
        placeholder="1"
        value={data.quantity}
        onChange={(e) => onChange(index, 'quantity', e.target.value)}
        onWheel={(e) => e.target.blur()}
        onFocus={e => e.target.select()}
        errors={[]}
        required
      />
      <Input
        label= {`Price(${CURRENCY})`}
        id={`rate${index}`}
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.rate}
        onChange={(e) => onChange(index, 'rate', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
        required
      />
      {/* <Input
        label= {`Extra charges(${CURRENCY})`}
        id="extra_charges"
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.extra_charges}
        onChange={(e) => onChange(index, 'extra_charges', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
      /> */}
      <Input
        label= {`Amount(${CURRENCY})`}
        id={`amount${index}`}
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.amount}
        onChange={(e) => onChange(index, 'amount', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
        readOnly
        disabled
      />
      <div className='flex items-end justify-end py-1'>
        <button
          type="button"
          onClick={onRemove}
          className="h-9 border text-red-500 border-red-100 hover:bg-red-50 gap-1 text-sm rounded-3xl flex justify-center items-center px-3 md:px-0 md:w-9"
        >
          <TrashIcon className="h-4.5" />
          <span className='font-medium md:hidden'>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default InvoiceItem