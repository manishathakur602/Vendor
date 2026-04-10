import React from 'react'
import Barcode from 'react-barcode'

export default function BarcodeDisplay({value}){
  return (
    <div style={{padding:8,background:'#fff',display:'inline-block'}}>
      <Barcode value={value || '0000'} format="CODE128" />
    </div>
  )
}
