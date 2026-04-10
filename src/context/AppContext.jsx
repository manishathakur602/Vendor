import React, { createContext, useContext, useEffect, useState } from 'react'
import seedData from '../mock/seed'
import dayjs from 'dayjs'

const STORAGE_KEY = 'vmp_data'

const AppContext = createContext()

export function AppProvider({ children }){
  const [data, setData] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : seedData
    }catch(e){
      return seedData
    }
  })

  // helper to get current vendor object
  const currentVendor = data.vendors.find(v=> v.id === data.currentVendorId) || null

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },[data])

  // vendors
  function addVendor(v){
    const nv = {...v, id: 'v'+Date.now(), status:'Pending', createdAt: dayjs().toISOString()}
    setData(s=> ({...s, vendors:[nv, ...s.vendors]}))
    return nv
  }
  function updateVendor(id, patch){
    setData(s=> ({...s, vendors: s.vendors.map(v=> v.id===id ? {...v,...patch}:v)}))
  }

  // products
  function addProduct(p){
    const np = {...p, id:'p'+Date.now(), sku: p.sku || 'SKU'+Date.now()}
    setData(s=> ({...s, products:[np,...s.products]}))
    return np
  }
  function updateProduct(id, patch){
    setData(s=> ({...s, products: s.products.map(pr=> pr.id===id ? {...pr,...patch} : pr)}))
  }
  function deleteProduct(id){
    setData(s=> ({...s, products: s.products.filter(pr=> pr.id!==id)}))
  }

  // POs
  function createPO(po){
    const npo = {...po, id:'po'+Date.now(), createdAt: dayjs().toISOString(), status:'Pending'}
    setData(s=> ({...s, pos:[npo,...s.pos]}))
    return npo
  }

  function updatePO(id, patch){
    setData(s=> ({...s, pos: s.pos.map(p => p.id===id?{...p,...patch}:p)}))
  }

  // invoices
  function submitInvoice(inv){
    const ni = {...inv, id:'inv'+Date.now(), createdAt: dayjs().toISOString(), status:'Submitted'}
    setData(s=> ({...s, invoices:[ni,...s.invoices]}))
    return ni
  }

  function updateInvoice(id, patch){
    setData(s=> ({...s, invoices: s.invoices.map(i=> i.id===id?{...i,...patch}:i)}))
  }

  // shipments
  function updateShipment(poId, shipment){
    setData(s=> ({...s, shipments: [{...shipment, id:'sh'+Date.now(), poId, createdAt: dayjs().toISOString()},...s.shipments]}))
  }

  // payments
  function addPayment(payment){
    setData(s=> ({...s, payments:[{...payment, id:'pay'+Date.now(), createdAt: dayjs().toISOString()}, ...s.payments]}))
  }

  // Auth: vendor login / logout
  function loginVendorByEmail(email){
    const v = data.vendors.find(x=> x.email === email)
    if(!v) return null
    // only set current session when vendor is Active
    if(v.status === 'Active'){
      setData(s=> ({...s, currentVendorId: v.id}))
    }
    return v
  }

  function logoutVendor(){
    setData(s=> ({...s, currentVendorId: null}))
  }

  return (
    <AppContext.Provider value={{data, currentVendor, addVendor, updateVendor, addProduct, updateProduct, deleteProduct, createPO, updatePO, submitInvoice, updateInvoice, updateShipment, addPayment, loginVendorByEmail, logoutVendor}}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(){
  return useContext(AppContext)
}
