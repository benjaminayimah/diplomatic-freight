'use client'

import React, { useState } from 'react'
import Input from '../Input';


function InvoiceItem({ data, index, onChange, onRemove}) {

  return (
    <div className='flex flex-col md:flex-row gap-3 pb-4 border-b border-gray-100 invoice-item-row'>
      <Input
        label="Description"
        id="description"
        type="text"
        placeholder="Description"
        value={data.description}
        onChange={(e) => onChange(index, 'description', e.target.value)}
        errors={[]}
        required
      />
      <Input
        label="Quantity"
        id="quantity"
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
        label="Rate(USD)"
        id="rate"
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.rate}
        onChange={(e) => onChange(index, 'rate', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
        required
      />
      <Input
        label="Extra charges(USD)"
        id="extra_charges"
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.extra_charges}
        onChange={(e) => onChange(index, 'extra_charges', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
      />
      <Input
        label="Amount(USD)"
        id="amount"
        type="number"
        placeholder="0.00"
        className='hide-counter'
        value={data.amount}
        onChange={(e) => onChange(index, 'amount', e.target.value)}
        onWheel={(e) => e.target.blur()}
        errors={[]}
      />
      <div className='flex items-end justify-end py-1'>
        <button
          type="button"
          onClick={onRemove}
          className="h-9 border border-red-100 hover:bg-red-50 gap-1 text-sm rounded-3xl flex justify-center items-center px-3 md:px-0 md:w-9"
        >
          <svg height="16" viewBox="0 0 15 16.001">
            <path d="M-4749.25-716a2.286,2.286,0,0,1-1.562-.668,2.153,2.153,0,0,1-.688-1.514v-9.455h-.75a.739.739,0,0,1-.75-.728.74.74,0,0,1,.75-.728h3v-.726a2.154,2.154,0,0,1,.688-1.515A2.286,2.286,0,0,1-4747-732h3a2.286,2.286,0,0,1,1.562.668,2.154,2.154,0,0,1,.688,1.515v.726h3a.74.74,0,0,1,.75.728.739.739,0,0,1-.75.728h-.749v9.455a2.15,2.15,0,0,1-.689,1.514,2.286,2.286,0,0,1-1.562.668Zm-.75-2.182a.733.733,0,0,0,.249.485.775.775,0,0,0,.5.241h7.5a.773.773,0,0,0,.5-.241.732.732,0,0,0,.25-.485v-9.455h-9Zm2.5-12.123a.739.739,0,0,0-.25.487v.726h4.5v-.726a.739.739,0,0,0-.25-.487.774.774,0,0,0-.5-.241h-3A.774.774,0,0,0-4747.5-730.3Zm2.75,9.941v-4.365a.739.739,0,0,1,.75-.726.739.739,0,0,1,.75.726v4.365a.739.739,0,0,1-.75.726A.739.739,0,0,1-4744.75-720.363Zm-3,0v-4.365a.739.739,0,0,1,.75-.726.739.739,0,0,1,.75.726v4.365a.739.739,0,0,1-.75.726A.739.739,0,0,1-4747.75-720.363Z" transform="translate(4753 732.001)" fill="#ef4444"/>
          </svg>
          <span className='text-red-500 font-medium md:hidden'>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default InvoiceItem